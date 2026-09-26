# Valheim Server Configurator

A visual, browser-based tool for configuring [Valheim](https://www.valheimgame.com/) dedicated servers.

Set sliders and toggles that mirror Valheim's in-game **World Modifiers** screen, fill in your server details, and get a ready-to-paste config for your hosting method of choice. No installs, no build steps, pure HTML/CSS/JS.

**[Try it live → https://icemansparks.github.io/ValheimWorldConfigurator/](https://icemansparks.github.io/ValheimWorldConfigurator/)**

---

## Features

- Matches Valheim's in-game World Modifiers UI (presets + individual sliders + toggles)
- All server identity and backup settings in one place
- Generates configs for **4 hosting methods**:

| Tab | What it generates |
|-----|------------------|
| **WindowsGSM** | `Server Start Param` field only, Name/Port/World excluded (they're separate fields in WindowsGSM) |
| **Windows .bat** | Complete `start_headless_server.bat` ready to drop in your server folder |
| **Linux / SteamCMD** | Complete `start_server.sh` |
| **Docker Compose** | `docker-compose.yml` for the `lloesche/valheim-server` image |

- One-click **Copy** button per config
- Responsive, collapses to 2-col/1-col on smaller screens

---

## Usage

Open `index.html` in any modern browser. No server required.

Or use the hosted GitHub Pages version (see link above).

---

## Supported Valheim Version

Compatible with Valheim **1.0.16** (dedicated server build 25527701, released 2026-09-25). 1.0 released 2026-09-09.

Modifier names and values are verified against the `Valheim Dedicated Server Manual.pdf` shipped with that build, and against a live server for the cases where the manual is wrong or incomplete.

When a new Valheim update changes server parameters, update the `VALHEIM_VERSION` constant at the top of `app.js`.

---

## Hosting Methods Covered

### WindowsGSM
Paste the output from the **WindowsGSM** tab into the *Server Start Param* field.
Server Name, Port, Query Port, and World Name go in their own WindowsGSM fields.

### Windows .bat
Copy the **Windows .bat** output into a file named `start_headless_server.bat` in your Valheim server directory. Run as Administrator.

### Linux / SteamCMD
Copy the **Linux / SteamCMD** output, save as `start_server.sh`, then:
```bash
chmod +x start_server.sh
./start_server.sh
```

### Docker Compose
Copy the **Docker Compose** output, save as `docker-compose.yml`, then:
```bash
docker compose up -d
```
Uses the [`lloesche/valheim-server`](https://github.com/lloesche/valheim-server-docker) image.

---

## Translations

Each language is one file in `lang/`, registering itself on load. The language
switcher builds its buttons from whatever files are present, so adding a
language means copying `lang/en.js`, translating the values, and adding one
script tag to `index.html`. No application code changes.

Full instructions and the rules for what not to translate are in
[`lang/README.md`](lang/README.md). Before opening a pull request, run:

```bash
node lang/check-languages.js
```

It compares every language against English and exits non-zero if any key is
missing.

Translations welcome.

## References

- [Valheim Dedicated Server Guide](https://www.valheimgame.com/support/a-guide-to-dedicated-servers/), Iron Gate AB
- [World Modifiers, Valheim Wiki](https://valheim.weirdgloop.org/w/World_Modifiers)
- [Console Commands, Valheim Wiki](https://valheim.weirdgloop.org/w/Console_commands)
- [WindowsGSM](https://windowsgsm.com/)
- [lloesche/valheim-server-docker](https://github.com/lloesche/valheim-server-docker)
- [Valheim Dedicated Server on Steam](https://store.steampowered.com/app/896660/Valheim_Dedicated_Server/)

---

## Support

If this saved you some time, you can [buy me a coffee](https://ko-fi.com/icemansparks).

## Disclaimer

This project is not affiliated with or endorsed by Iron Gate AB or Coffee Stain Publishing.
Valheim is a trademark of Iron Gate AB.

---

## License

[GNU Affero General Public License v3.0](LICENSE).

You may use, modify and self-host this tool freely. If you run a modified
version where other people can reach it, you have to make your source
available to them under the same licence. In practice that means a public
fork is fine and a closed, rebranded copy is not.

The footer's "Source on GitHub" link is how the hosted copy satisfies that
requirement; keep an equivalent link if you deploy your own version.

For a licence without these terms, ask.
