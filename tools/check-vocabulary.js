// Compares every command-line name and value the tool can emit or import
// against tools/server-vocabulary.json, the list taken from the dedicated server.
// Usage: node tools/check-vocabulary.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const vocab = JSON.parse(fs.readFileSync(path.join(__dirname, 'server-vocabulary.json'), 'utf8'));

// Just enough DOM for app.js to load and generate commands.
const elements = {};
function el(id) {
  if (!elements[id]) {
    elements[id] = {
      id, value: '', checked: false, textContent: '', dataset: {},
      classList: { add() {}, remove() {}, toggle() {} },
      setAttribute() {}, appendChild() {}, addEventListener() {}
    };
  }
  return elements[id];
}
const sandbox = {
  window: {}, console, setTimeout, navigator: {},
  localStorage: { getItem: () => null, setItem() {} },
  document: {
    getElementById: el,
    querySelectorAll: () => [],
    createElement: () => el('created-' + Object.keys(elements).length),
    documentElement: {}
  }
};
vm.createContext(sandbox);
for (const f of fs.readdirSync(path.join(root, 'lang')).filter(f => f.endsWith('.js') && !f.startsWith('check-'))) {
  vm.runInContext(fs.readFileSync(path.join(root, 'lang', f), 'utf8'), sandbox, { filename: 'lang/' + f });
}
// const declarations are not sandbox properties, so expose what the check needs.
vm.runInContext(
  fs.readFileSync(path.join(root, 'app.js'), 'utf8') +
  '\n;this.SLIDERS = SLIDERS; this.PRESETS = PRESETS; this.CHECKS = CHECKS; this.CHK_ID = CHK_ID;',
  sandbox, { filename: 'app.js' }
);
const { SLIDERS, PRESETS, CHECKS, CHK_ID } = sandbox;

const errors = [];

function resetForm() {
  for (const [key, d] of Object.entries(SLIDERS)) el('sl-' + key).value = String(d.def);
  for (const k of CHECKS) el(CHK_ID[k]).checked = false;
}

// Every argument the tool emits, taken from its own generator.
function emitted() {
  const tokens = sandbox.modifierArgs().join(' ').split(' ');
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '-modifier') { out.push(['modifier', tokens[i + 1], tokens[i + 2]]); i += 2; }
    else if (tokens[i] === '-setkey') { out.push(['setkey', tokens[i + 1]]); i += 1; }
    else if (tokens[i] === '-preset') { out.push(['preset', tokens[i + 1]]); i += 1; }
  }
  return out;
}

function checkEmitted(what) {
  for (const [kind, name, value] of emitted()) {
    if (kind === 'modifier') {
      if (!vocab.modifiers[name]) errors.push(`${what}: emits unknown modifier name '${name}'`);
      else if (!vocab.modifiers[name].includes(value)) errors.push(`${what}: emits unknown value '${value}' for modifier '${name}'`);
    } else if (kind === 'setkey' && !vocab.setkeys.includes(name)) {
      errors.push(`${what}: emits unknown setkey '${name}'`);
    } else if (kind === 'preset' && !vocab.presets.includes(name)) {
      errors.push(`${what}: emits unknown preset '${name}'`);
    }
  }
}

// Each slider position and each checkbox on its own.
for (const [key, d] of Object.entries(SLIDERS)) {
  d.values.forEach((value, idx) => {
    resetForm();
    el('sl-' + key).value = String(idx);
    checkEmitted(`slider ${key}=${value}`);
  });
}
for (const k of CHECKS) {
  resetForm();
  el(CHK_ID[k]).checked = true;
  checkEmitted(`checkbox ${k}`);
}

// Presets are applied in the page and emitted as modifiers, but their names
// still have to be server presets.
for (const name of Object.keys(PRESETS)) {
  if (!vocab.presets.includes(name)) errors.push(`preset '${name}' is not a server preset`);
  resetForm();
  sandbox.applyPreset(name);
  checkEmitted(`preset ${name}`);
}

// Every server modifier value imports into the matching slider.
for (const [name, values] of Object.entries(vocab.modifiers)) {
  const entry = Object.entries(SLIDERS).find(([key, d]) => (d.arg || key) === name);
  if (!entry) { errors.push(`server modifier '${name}' has no slider`); continue; }
  const [key, d] = entry;
  for (const value of values) {
    resetForm();
    sandbox.parseAndImport(`-modifier ${name} ${value}`);
    const got = d.values[+el('sl-' + key).value];
    if (got !== value) errors.push(`import '-modifier ${name} ${value}' set slider ${key} to '${got}'`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) against server build ${vocab.build}`);
  process.exit(1);
}
console.log(`All emitted and imported names match server build ${vocab.build}.`);
