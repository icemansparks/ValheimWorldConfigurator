// Deutsch (de)
// Every language file must define the same keys. See lang/README.md.
window.TRANSLATIONS = window.TRANSLATIONS || {};
window.TRANSLATION_NAMES = window.TRANSLATION_NAMES || {};
window.TRANSLATION_NAMES['de'] = 'Deutsch';
window.TRANSLATIONS['de'] = {
  'page.title':'Valheim Server-Konfigurator','page.subtitle':'Konfiguriere deinen Dedicated Server und erhalte fertige Startbefehle',
  'panel.identity':'Server-Identit\xe4t','panel.modifiers':'Weltmodifikatoren','panel.backup':'Backup- & Speichereinstellungen','panel.output':'Generierte Konfiguration',
  'field.serverName':'Servername','field.port':'Port','field.queryPort':'Abfrageport','field.password':'Passwort','field.worldName':'Weltname',
  'field.saveDir':'Speicherverzeichnis','field.instanceId':'Instanz-ID','field.optional':'(optional)','field.logFile':'Protokolldateipfad',
  'field.saveInterval':'Speicherintervall (Sek)','field.backupCount':'Anzahl Backups','field.backupShort':'Kurzes Backup (Sek)','field.backupLong':'Langes Backup (Sek)',
  'a11y.hint':'Weitere Informationen','hint.port':'UDP (Port+1 wird ebenfalls verwendet)','hint.queryPort':'Normalerweise Port+1','hint.worldName':'Erstellt eine neue Welt, falls sie nicht existiert',
  'hint.saveInterval':'Standard: 1800 (30 Min)','hint.backupCount':'Wie viele Backups aufbewahrt werden','hint.backupShort':'Standard: 7200 (2 Std)','hint.backupLong':'Standard: 43200 (12 Std)',
  'ph.password':'(leer lassen f\xfcr kein Passwort)','ph.saveDir':'(Standard-Speicherort)','ph.instanceId':'z.B. 1, f\xfcr mehrere Server auf derselben IP','ph.logFile':'z.B. C:\\logs\\valheim.log',
  'toggle.public':'\xd6ffentlich (im Serverbrowser sichtbar)','toggle.crossplay':'Crossplay (PlayFab-Backend)',
  'toggle.nobuildcost':'Keine Baukosten','toggle.playerevents':'Spielerbasierte \xdcberf\xe4lle','toggle.passivemobs':'Passive Feinde','toggle.nomap':'Keine Karte','toggle.fire':'Brandgefahr',
  'preset.easy':'Einfach','preset.hard':'Schwierig','preset.hardcore':'Albtraum','preset.casual':'Gelegenheitsmodus','preset.hammer':'Hammermodus','preset.immersive':'Immersiv','preset.reset':'\u21BB Auf Normal zur\xfccksetzen',
  'slider.combat':'Kampf','slider.death':'Todesfolgen','slider.resources':'Ressourcenrate','slider.raids':'\xdcberfall-Rate','slider.portals':'Portale',
  'lbl.veryeasy':'Sehr Einfach','lbl.easy':'Einfach','lbl.normal':'Normal','lbl.hard':'Schwierig','lbl.veryhard':'Sehr Schwierig',
  'lbl.casual':'Gelegenheitsmodus','lbl.hardcore':'Albtraum','lbl.none':'Keine','lbl.muchless':'Viel Seltener','lbl.less':'Seltener','lbl.more':'H\xe4ufiger','lbl.muchmore':'Viel H\xe4ufiger',
  'lbl.res.half':'0,5\xd7','lbl.res.threequarter':'0,75\xd7','lbl.res.onehalf':'1,5\xd7','lbl.res.double':'2\xd7','lbl.res.triple':'3\xd7',
  'tab.windowsgsm':'WindowsGSM','tab.winbat':'Windows .bat','tab.linux':'Linux / SteamCMD','tab.docker':'Docker Compose',
  'desc.windowsgsm':'In das <code>Server Start Param</code>-Feld in WindowsGSM einf\xfcgen.<br>Servername, Port, Abfrageport und Weltname werden in eigenen WindowsGSM-Feldern gesetzt und sind hier <strong>nicht</strong> enthalten.',
  'desc.winbat':'Vollst\xe4ndige <code>start_headless_server.bat</code>. In das Valheim-Serververzeichnis legen und als Administrator ausf\xfchren.',
  'desc.linux':'Vollst\xe4ndiges <code>start_server.sh</code> f\xfcr Linux / SteamCMD-Installationen.<br>Ausf\xfchrbar machen: <code>chmod +x start_server.sh</code>',
  'desc.docker':'<code>docker-compose.yml</code> mit dem <strong>lloesche/valheim-server</strong>-Image.<br>Starten mit: <code>docker compose up -d</code>',
  'copy.btn':'Kopieren','copy.ok':'\u2713 Kopiert!',
  'import.btn':'Konfig importieren','import.title':'Bestehende Konfiguration importieren',
  'import.placeholder':'Konfiguration hier einf\xfcgen, beliebiges Format (WindowsGSM, .bat, .sh, docker-compose.yml)',
  'import.do':'Importieren','import.cancel':'Abbrechen','import.success':'Konfiguration importiert!','import.error':'Konfiguration konnte nicht gelesen werden.',
  'footer.official':'Offizielle Dokumentation','footer.tools':'Hosting-Tools',
  'footer.appname':'Valheim Server-Konfigurator','footer.compat':'Kompatibel mit Valheim',
  'footer.source':'Quellcode auf GitHub','footer.kofi':'Spendier mir einen Kaffee',
  'footer.disclaimer':'Nicht mit Iron Gate AB verbunden. AGPL-3.0'
  };
