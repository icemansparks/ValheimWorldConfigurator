// Compares every language file against English and reports missing or extra keys.
// Usage: node lang/check-languages.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const sandbox = { window: {} };
vm.createContext(sandbox);

const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.js') && f !== path.basename(__filename))
  .sort();

let loadFailed = false;
for (const f of files) {
  const before = Object.keys(sandbox.window.TRANSLATIONS || {});
  try {
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
  } catch (err) {
    // Keep going, so one broken file does not hide the state of the rest.
    console.error(`${f}: failed to load, ${err.message}`);
    loadFailed = true;
    continue;
  }
  // A file that registers nothing would otherwise vanish from the report. The
  // usual cause is assigning TRANSLATIONS without the window. prefix, which is
  // legal in a sandbox and silently writes somewhere nothing reads.
  const after = Object.keys(sandbox.window.TRANSLATIONS || {});
  if (after.length === before.length) {
    console.error(`${f}: registered no language. Assign to window.TRANSLATIONS['<code>'], see lang/README.md.`);
    loadFailed = true;
  }
}

const tables = sandbox.window.TRANSLATIONS || {};
const names = sandbox.window.TRANSLATION_NAMES || {};

if (!tables.en) {
  console.error('en.js did not register a table; nothing to compare against.');
  process.exit(1);
}

const reference = Object.keys(tables.en).sort();
let failed = false;

console.log(`Reference: en, ${reference.length} keys\n`);

for (const code of Object.keys(tables).sort()) {
  if (code === 'en') continue;
  const keys = Object.keys(tables[code]);
  const missing = reference.filter(k => !keys.includes(k));
  const extra = keys.filter(k => !reference.includes(k)).sort();
  const label = `${code} (${names[code] || 'unnamed'})`;

  if (!missing.length && !extra.length) {
    console.log(`${label}: complete, ${keys.length} keys`);
    continue;
  }
  failed = true;
  console.log(`${label}: ${keys.length} keys`);
  if (missing.length) console.log(`  missing ${missing.length}: ${missing.join(', ')}`);
  if (extra.length) console.log(`  not in en (${extra.length}): ${extra.join(', ')}`);
}

if (!names.en) {
  console.log('\nen.js registered no display name in TRANSLATION_NAMES.');
}

process.exit(failed || loadFailed ? 1 : 0);
