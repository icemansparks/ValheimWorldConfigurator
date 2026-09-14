// Loads app.js and the language files in a Node sandbox with just enough DOM
// for the page to generate and import commands. Used by the tools/ scripts.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function loadApp() {
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
  // const declarations are not sandbox properties, so expose what the tools need.
  vm.runInContext(
    fs.readFileSync(path.join(root, 'app.js'), 'utf8') +
    '\n;this.SLIDERS = SLIDERS; this.PRESETS = PRESETS; this.CHECKS = CHECKS; this.CHK_ID = CHK_ID;',
    sandbox, { filename: 'app.js' }
  );
  return { app: sandbox, el };
}

function readVocabulary() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'server-vocabulary.json'), 'utf8'));
}

module.exports = { loadApp, readVocabulary };
