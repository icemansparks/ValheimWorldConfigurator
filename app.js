// Valheim Server Configurator
// Copyright (C) 2026 icemansparks
// Licensed under the GNU Affero General Public License v3.0 or later.
// See LICENSE, or https://www.gnu.org/licenses/agpl-3.0.html
// Version
const VALHEIM_VERSION = '1.0.12';
const VALHEIM_BUILD   = '25253791';

// Translations
const TRANSLATIONS = window.TRANSLATIONS || {};
if (!TRANSLATIONS.en) {
  console.error('No language files loaded. Check the lang/*.js script tags in index.html.');
}

// Slider definitions (labelKeys point into TRANSLATIONS)
const SLIDERS = {
  combat:    { values:['veryeasy','easy','normal','hard','veryhard'],          labelKeys:['lbl.veryeasy','lbl.easy','lbl.normal','lbl.hard','lbl.veryhard'],           def:2 },
  death:     { values:['casual','veryeasy','easy','normal','hard','hardcore'],  labelKeys:['lbl.casual','lbl.veryeasy','lbl.easy','lbl.normal','lbl.hard','lbl.hardcore'], def:3 },
  resources: { values:['muchless','less','normal','more','muchmore','most'],     labelKeys:['lbl.res.half','lbl.res.threequarter','lbl.normal','lbl.res.onehalf','lbl.res.double','lbl.res.triple'], def:2 },
  raids:     { values:['none','muchless','less','normal','more','muchmore'],    labelKeys:['lbl.none','lbl.muchless','lbl.less','lbl.normal','lbl.more','lbl.muchmore'], def:3 },
  portals:   { values:['casual','normal','hard','veryhard'],                    labelKeys:['lbl.casual','lbl.normal','lbl.hard','lbl.veryhard'],                        def:1 }
};

// Preset definitions
// Slider indices:
//   combat:    0=veryeasy 1=easy 2=normal 3=hard 4=veryhard
//   death:     0=casual 1=veryeasy 2=easy 3=normal 4=hard 5=hardcore(nightmare)
//   resources: 0=muchless(50) 1=less(75) 2=normal(100) 3=more(150) 4=muchmore(200) 5=most(300)
//   raids:     0=none 1=muchless 2=less 3=normal 4=more 5=muchmore
//   portals:   0=casual 1=normal 2=hard 3=veryhard
const PRESETS = {
  normal:   { combat:2,death:3,resources:2,raids:3,portals:1, nobuildcost:false,playerevents:false,passivemobs:false,nomap:false,fire:false },
  easy:     { combat:1,death:3,resources:2,raids:2,portals:1, nobuildcost:false,playerevents:false,passivemobs:false,nomap:false,fire:false },
  hard:     { combat:3,death:3,resources:2,raids:4,portals:1, nobuildcost:false,playerevents:false,passivemobs:false,nomap:false,fire:false },
  hardcore: { combat:4,death:5,resources:2,raids:4,portals:3, nobuildcost:false,playerevents:false,passivemobs:false,nomap:true, fire:false },
  casual:   { combat:0,death:0,resources:3,raids:0,portals:0, nobuildcost:false,playerevents:false,passivemobs:false,nomap:false,fire:false },
  hammer:   { combat:2,death:3,resources:2,raids:0,portals:1, nobuildcost:true, playerevents:false,passivemobs:true, nomap:false,fire:false },
  immersive:{ combat:2,death:3,resources:2,raids:3,portals:3, nobuildcost:false,playerevents:false,passivemobs:false,nomap:true, fire:false }
};

const CHECKS = ['nobuildcost','playerevents','passivemobs','nomap','fire'];
const CHK_ID  = { nobuildcost:'chkNobuildcost', playerevents:'chkPlayerevents', passivemobs:'chkPassivemobs', nomap:'chkNomap', fire:'chkFire' };
const CHK_KEY = { nobuildcost:'nobuildcost', playerevents:'playerevents', passivemobs:'passivemobs', nomap:'nomap', fire:'fire' };

// Current translation table
function curT() { return langTable(localStorage.getItem('vsc-lang') || 'en'); }
// A language file missing a key falls back to English rather than rendering blank.
// Merged once per language: the tables do not change after load, and curT runs
// on every slider move.
const mergedTables = {};
function langTable(code) {
  const base = TRANSLATIONS['en'] || {};
  if (code === 'en') return base;
  if (!mergedTables[code]) {
    mergedTables[code] = Object.assign({}, base, TRANSLATIONS[code] || {});
  }
  return mergedTables[code];
}

// Slider change handler
function onSlider(key) {
  const d = SLIDERS[key];
  const v = +document.getElementById('sl-'+key).value;
  const t = curT();
  document.getElementById('lbl-'+key).textContent = t[d.labelKeys[v]] || d.labelKeys[v];
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  updateOutputs();
}

// Apply preset
function applyPreset(name, btn) {
  const p = PRESETS[name]; if (!p) return;
  const t = curT();
  for (const key of Object.keys(SLIDERS)) {
    document.getElementById('sl-'+key).value = p[key];
    document.getElementById('lbl-'+key).textContent = t[SLIDERS[key].labelKeys[p[key]]] || SLIDERS[key].labelKeys[p[key]];
  }
  for (const k of CHECKS) document.getElementById(CHK_ID[k]).checked = p[k];
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateOutputs();
}

// Collect modifier args
function modifierArgs() {
  const args = [];
  for (const [key, d] of Object.entries(SLIDERS)) {
    const idx = +document.getElementById('sl-'+key).value;
    if (idx !== d.def) args.push('-modifier '+key+' '+d.values[idx]);
  }
  for (const k of CHECKS) {
    if (document.getElementById(CHK_ID[k]).checked) args.push('-setkey '+CHK_KEY[k]);
  }
  return args;
}

// Read all form values
function vals() {
  return {
    name:          document.getElementById('serverName').value,
    port:          parseInt(document.getElementById('serverPort').value) || 2456,
    queryPort:     parseInt(document.getElementById('queryPort').value)  || 2457,
    password:      document.getElementById('serverPassword').value,
    world:         document.getElementById('worldName').value,
    saveDir:       document.getElementById('saveDir').value.trim(),
    instanceId:    document.getElementById('instanceId').value.trim(),
    isPublic:      document.getElementById('chkPublic').checked,
    crossplay:     document.getElementById('chkCrossplay').checked,
    saveInterval:  document.getElementById('saveInterval').value,
    backups:       document.getElementById('backupCount').value,
    backupShort:   document.getElementById('backupShort').value,
    backupLong:    document.getElementById('backupLong').value,
    logFile:       document.getElementById('logFile').value.trim()
  };
}

// Common extra params (shared by all formats)
function commonArgs(v, includeIdentity) {
  const a = [];
  if (includeIdentity) {
    a.push(`-name "${v.name}"`);
    a.push(`-port ${v.port}`);
    a.push(`-world "${v.world}"`);
  }
  if (v.password)   a.push(`-password "${v.password}"`);
  a.push(`-public ${v.isPublic ? 1 : 0}`);
  if (v.crossplay)  a.push(`-crossplay`);
  a.push(`-saveinterval ${v.saveInterval}`);
  a.push(`-backups ${v.backups}`);
  a.push(`-backupshort ${v.backupShort}`);
  a.push(`-backuplong ${v.backupLong}`);
  if (v.saveDir)    a.push(`-savedir "${v.saveDir}"`);
  if (v.instanceId) a.push(`-instanceid "${v.instanceId}"`);
  if (v.logFile)    a.push(`-logFile "${v.logFile}"`);
  a.push(...modifierArgs());
  return a;
}

// Generators
function genWindowsGSM() {
  // WindowsGSM handles -name, -port, -world in its own fields
  return commonArgs(vals(), false).join(' ');
}

function genWinBat() {
  const v = vals();
  const args = commonArgs(v, true);
  const lines = [
    '@echo off',
    'set SteamAppId=892970',
    '',
    'echo "Starting Valheim Dedicated Server..."',
    '',
    'valheim_server.exe ^'
  ];
  args.forEach((a, i) => lines.push('  ' + a + (i < args.length-1 ? ' ^' : '')));
  lines.push('', 'pause');
  return lines.join('\r\n');
}

function genLinux() {
  const v = vals();
  const args = commonArgs(v, true);
  const lines = [
    '#!/bin/bash',
    '# Valheim Dedicated Server, generated by Valheim Server Configurator',
    '',
    'export SteamAppId=892970',
    'export LD_LIBRARY_PATH="./linux64:$LD_LIBRARY_PATH"',
    '',
    'echo "Starting Valheim Dedicated Server..."',
    '',
    './valheim_server.x86_64 \\'
  ];
  args.forEach((a, i) => lines.push('  ' + a + (i < args.length-1 ? ' \\' : '')));
  return lines.join('\n');
}

function genDocker() {
  const v = vals();
  const modArgs = modifierArgs();
  let extraArgs = `-saveinterval ${v.saveInterval} -backups ${v.backups} -backupshort ${v.backupShort} -backuplong ${v.backupLong}`;
  if (v.instanceId) extraArgs += ` -instanceid "${v.instanceId}"`;
  if (v.logFile)    extraArgs += ` -logFile "${v.logFile}"`;
  if (v.crossplay)  extraArgs += ` -crossplay`;
  if (modArgs.length) extraArgs += ' ' + modArgs.join(' ');
  const dataVol = v.saveDir || '/opt/valheim/saves';
  return [
    'version: "3"',
    'services:',
    '  valheim:',
    '    image: lloesche/valheim-server:latest',
    '    container_name: valheim-server',
    '    restart: unless-stopped',
    '    cap_add:',
    '      - SYS_NICE',
    '    ports:',
    `      - "${v.port}:${v.port}/udp"`,
    `      - "${v.port+1}:${v.port+1}/udp"`,
    `      - "${v.queryPort}:${v.queryPort}/tcp"`,
    '    volumes:',
    `      - ${dataVol}/config:/config`,
    `      - ${dataVol}/data:/opt/valheim/data`,
    '    environment:',
    `      SERVER_NAME: "${v.name}"`,
    `      WORLD_NAME: "${v.world}"`,
    `      SERVER_PORT: "${v.port}"`,
    `      SERVER_PASS: "${v.password}"`,
    `      SERVER_PUBLIC: "${v.isPublic ? 1 : 0}"`,
    `      SERVER_ARGS: "${extraArgs.trim()}"`,
  ].join('\n');
}

// Update all outputs
function updateOutputs() {
  document.getElementById('out-windowsgsm').value = genWindowsGSM();
  document.getElementById('out-winbat').value     = genWinBat();
  document.getElementById('out-linux').value      = genLinux();
  document.getElementById('out-docker').value     = genDocker();
}

// Tab switching
function switchTab(name, btn) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  btn.classList.add('active');
}

// Copy button
function copyOut(id, btn) {
  const t = curT();
  navigator.clipboard.writeText(document.getElementById(id).value).then(() => {
    btn.textContent = t['copy.ok'] || '\u2713 Copied!';
    btn.classList.add('ok');
    setTimeout(() => { btn.textContent = t['copy.btn'] || 'Copy'; btn.classList.remove('ok'); }, 2000);
  });
}

// i18n
function applyLang(code) {
  if (!TRANSLATIONS[code]) code = 'en';
  const t = langTable(code);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n; if (t[k] !== undefined) el.textContent = t[k];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.dataset.i18nHtml; if (t[k] !== undefined) el.innerHTML = t[k];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const k = el.dataset.i18nAria; if (t[k] !== undefined) el.setAttribute('aria-label', t[k]);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const k = el.dataset.i18nPlaceholder; if (t[k] !== undefined) el.placeholder = t[k];
  });
  // Refresh slider value labels in current language
  for (const key of Object.keys(SLIDERS)) {
    const d = SLIDERS[key];
    const v = +document.getElementById('sl-'+key).value;
    document.getElementById('lbl-'+key).textContent = t[d.labelKeys[v]] || d.labelKeys[v];
  }
  // Update lang button active state
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === code));
  document.documentElement.lang = code;
}
function setLang(code) {
  localStorage.setItem('vsc-lang', code);
  applyLang(code);
}

// The switcher is built from the language files that registered themselves,
// so adding lang/xx.js and its script tag is all a new language needs.
function buildLangSwitcher() {
  const host = document.getElementById('langSwitcher');
  if (!host) return;
  const names = window.TRANSLATION_NAMES || {};
  host.innerHTML = '';
  const codes = Object.keys(TRANSLATIONS).sort();
  const ordered = codes.includes('en') ? ['en'].concat(codes.filter(c => c !== 'en')) : codes;
  ordered.forEach(code => {
    const b = document.createElement('button');
    b.className = 'lang-btn';
    b.dataset.lang = code;
    b.textContent = code.toUpperCase();
    b.title = names[code] || code;
    b.addEventListener('click', () => setLang(code));
    host.appendChild(b);
  });
}

// Import modal
function openImport() {
  document.getElementById('importText').value = '';
  document.getElementById('importMsg').textContent = '';
  document.getElementById('importModal').classList.add('open');
}
function closeImport() { document.getElementById('importModal').classList.remove('open'); }
function handleModalBg(e) { if (e.target === document.getElementById('importModal')) closeImport(); }
function doImport() {
  const text = document.getElementById('importText').value;
  const t = curT();
  if (!text.trim()) return;
  try {
    parseAndImport(text);
    document.getElementById('importMsg').textContent = t['import.success'] || 'Config imported!';
    setTimeout(closeImport, 900);
  } catch(e) {
    document.getElementById('importMsg').textContent = t['import.error'] || 'Could not parse config.';
  }
}

// Import parser
function extractDockerArgs(text) {
  function yv(key) {
    const m = text.match(new RegExp(key + '\\s*:\\s*"?([^"\\n]*)"?', 'm'));
    return m ? m[1].trim() : '';
  }
  let a = '';
  const name = yv('SERVER_NAME'), world = yv('WORLD_NAME'), port = yv('SERVER_PORT');
  const pass = yv('SERVER_PASS'), pub = yv('SERVER_PUBLIC'), extra = yv('SERVER_ARGS');
  if (name)  a += ` -name "${name}"`;
  if (world) a += ` -world "${world}"`;
  if (port)  a += ` -port ${port}`;
  if (pass)  a += ` -password "${pass}"`;
  if (pub !== '') a += ` -public ${pub}`;
  // extract queryPort from tcp port mapping
  const qm = text.match(/"(\d+):\d+\/tcp"/);
  if (qm) a += ` -queryport ${qm[1]}`;
  if (extra) a += ' ' + extra;
  return a.trim();
}
function extractBatArgs(text) {
  const joined = text.replace(/\s*\^\s*\r?\n\s*/g, ' ');
  const m = joined.match(/valheim_server\.exe\s+(.*)/i);
  return m ? m[1].trim() : '';
}
function extractLinuxArgs(text) {
  const joined = text.replace(/\s*\\\s*\n\s*/g, ' ');
  const m = joined.match(/valheim_server\.x86_64\s+(.*)/i);
  return m ? m[1].trim() : '';
}
function parseArgString(str) {
  const params = {};
  const tokens = [];
  const re = /"([^"]*)"|(\S+)/g; let m;
  while ((m = re.exec(str)) !== null) tokens.push(m[1] !== undefined ? m[1] : m[2]);
  let i = 0;
  while (i < tokens.length) {
    const tok = tokens[i];
    if (!tok.startsWith('-')) { i++; continue; }
    const key = tok.slice(1).toLowerCase();
    if (key === 'modifier' && i+2 < tokens.length) {
      params['modifier_'+tokens[i+1].toLowerCase()] = tokens[i+2].toLowerCase(); i += 3; continue;
    }
    if (key === 'setkey' && i+1 < tokens.length) {
      params['setkey_'+tokens[i+1].toLowerCase()] = true; i += 2; continue;
    }
    if (i+1 < tokens.length && !tokens[i+1].startsWith('-')) {
      params[key] = tokens[i+1]; i += 2;
    } else { params[key] = true; i++; }
  }
  return params;
}
function applyParsedArgs(params) {
  function sf(id, val) { const el = document.getElementById(id); if (el && val !== undefined) el.value = val; }
  function sc(id, val) { const el = document.getElementById(id); if (el) el.checked = !!val; }
  sf('serverName',   params.name);
  sf('serverPort',   params.port);
  sf('queryPort',    params.queryport);
  sf('serverPassword', params.password);
  sf('worldName',    params.world);
  sf('saveDir',      params.savedir);
  sf('instanceId',   params.instanceid);
  sf('logFile',      params.logfile);
  sf('saveInterval', params.saveinterval);
  sf('backupCount',  params.backups);
  sf('backupShort',  params.backupshort);
  sf('backupLong',   params.backuplong);
  if (params.public !== undefined) sc('chkPublic', params.public === '1' || params.public === true);
  if (params.crossplay !== undefined) sc('chkCrossplay', true);
  // Sliders
  const t = curT();
  for (const [key, d] of Object.entries(SLIDERS)) {
    const val = params['modifier_'+key];
    if (val !== undefined) {
      const idx = d.values.indexOf(val);
      if (idx >= 0) {
        document.getElementById('sl-'+key).value = idx;
        document.getElementById('lbl-'+key).textContent = t[d.labelKeys[idx]] || d.labelKeys[idx];
      }
    }
  }
  // Boolean toggles via -setkey
  sc('chkNobuildcost', params['setkey_nobuildcost']);
  sc('chkPlayerevents', params['setkey_playerevents']);
  sc('chkPassivemobs', params['setkey_passivemobs']);
  sc('chkNomap', params['setkey_nomap']);
  sc('chkFire', params['setkey_fire']);
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  updateOutputs();
}
function parseAndImport(raw) {
  const text = raw.trim();
  let argStr = '';
  if (/SERVER_NAME\s*:/i.test(text) || /^\s*environment\s*:/m.test(text)) {
    argStr = extractDockerArgs(text);
  } else if (/@echo off/i.test(text) || /valheim_server\.exe/i.test(text)) {
    argStr = extractBatArgs(text);
  } else if (/valheim_server\.x86_64/i.test(text) || /^#!\/bin\/bash/m.test(text)) {
    argStr = extractLinuxArgs(text);
  } else {
    argStr = text;
  }
  applyParsedArgs(parseArgString(argStr));
}

// Init
updateOutputs();
document.getElementById('ver-label').textContent = VALHEIM_VERSION;
document.getElementById('build-label').textContent = '(build ' + VALHEIM_BUILD + ')';
buildLangSwitcher();
applyLang(localStorage.getItem('vsc-lang') || 'en');
