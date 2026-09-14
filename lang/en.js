// English (en)
// Every language file must define the same keys. See lang/README.md.
window.TRANSLATIONS = window.TRANSLATIONS || {};
window.TRANSLATION_NAMES = window.TRANSLATION_NAMES || {};
window.TRANSLATION_NAMES['en'] = 'English';
window.TRANSLATIONS['en'] = {
  'page.title':'Valheim Server Configurator','page.subtitle':'Configure your dedicated server and generate ready-to-use startup commands',
  'panel.identity':'Server Identity','panel.modifiers':'World Modifiers','panel.backup':'Backup & Save Settings','panel.output':'Generated Configuration',
  'field.serverName':'Server Name','field.port':'Port','field.queryPort':'Query Port','field.password':'Password','field.worldName':'World Name',
  'field.saveDir':'Save Directory','field.instanceId':'Instance ID','field.optional':'(optional)','field.logFile':'Log File Path',
  'field.saveInterval':'Save Interval (sec)','field.backupCount':'Backup Count','field.backupShort':'Short Backup (sec)','field.backupLong':'Long Backup (sec)',
  'a11y.hint':'More information','hint.port':'UDP (port+1 also used)','hint.queryPort':'Typically port+1','hint.worldName':'Creates a new world if it does not exist',
  'hint.saveInterval':'Default: 1800 (30 min)','hint.backupCount':'How many backups to keep','hint.backupShort':'Default: 7200 (2 h)','hint.backupLong':'Default: 43200 (12 h)',
  'ph.password':'(leave blank for no password)','ph.saveDir':'(default save location)','ph.instanceId':'e.g. 1, for multiple servers on same IP','ph.logFile':'e.g. C:\\logs\\valheim.log',
  'toggle.public':'Public (visible in server browser)','toggle.crossplay':'Crossplay (PlayFab backend)',
  'toggle.nobuildcost':'No Build Cost','toggle.playerevents':'Player Based Raids','toggle.passivemobs':'Passive Enemies','toggle.nomap':'No Map','toggle.fire':'Fire Hazards',
  'preset.easy':'Easy','preset.hard':'Hard','preset.hardcore':'Hardcore','preset.casual':'Casual','preset.hammer':'Hammer Mode','preset.immersive':'Immersive','preset.reset':'\u21BB Reset to Normal',
  'slider.combat':'Combat','slider.death':'Death Penalty','slider.resources':'Resource Rate','slider.raids':'Raid Rate','slider.portals':'Portals',
  'lbl.veryeasy':'Very Easy','lbl.easy':'Easy','lbl.normal':'Normal','lbl.hard':'Hard','lbl.veryhard':'Very Hard',
  'lbl.casual':'Casual','lbl.hardcore':'Hardcore','lbl.none':'None','lbl.muchless':'Much Less','lbl.less':'Less','lbl.more':'More','lbl.muchmore':'Much More',
  'lbl.res.half':'0.5\xd7','lbl.res.threequarter':'0.75\xd7','lbl.res.onehalf':'1.5\xd7','lbl.res.double':'2\xd7','lbl.res.triple':'3\xd7',
  'tab.windowsgsm':'WindowsGSM','tab.winbat':'Windows .bat','tab.linux':'Linux / SteamCMD','tab.docker':'Docker Compose',
  'desc.windowsgsm':'Paste into the <code>Server Start Param</code> field in WindowsGSM.<br>Server Name, Port, Query Port, and World are set in their own WindowsGSM fields and are <strong>not</strong> included here.',
  'desc.winbat':'Complete <code>start_headless_server.bat</code>. Place it in your Valheim server directory and run as Administrator.',
  'desc.linux':'Complete <code>start_server.sh</code> for Linux / SteamCMD installs.<br>Make executable: <code>chmod +x start_server.sh</code>',
  'desc.docker':'<code>docker-compose.yml</code> using the <strong>lloesche/valheim-server</strong> image.<br>Run with: <code>docker compose up -d</code>',
  'copy.btn':'Copy','copy.ok':'\u2713 Copied!',
  'import.btn':'Import Config','import.title':'Import Existing Config',
  'import.placeholder':'Paste your config here, any format (WindowsGSM, .bat, .sh, docker-compose.yml)',
  'import.do':'Import','import.cancel':'Cancel','import.success':'Config imported!','import.error':'Could not parse config.',
  'import.unmatched':'Imported, but these values were not applied:',
  'footer.official':'Official Documentation','footer.tools':'Hosting Tools',
  'footer.appname':'Valheim Server Configurator','footer.compat':'Compatible with Valheim',
  'footer.source':'Source on GitHub','footer.kofi':'Buy me a coffee',
  'footer.disclaimer':'Not affiliated with Iron Gate AB. AGPL-3.0'
  };
