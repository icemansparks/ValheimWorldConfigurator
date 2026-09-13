# Language files

One file per language. Each registers itself on `window`, so `app.js` never has
to know which languages exist and the language switcher builds its buttons from
whatever loaded.

## Adding a language

1. Copy `en.js` to `<code>.js`, using the two-letter code for the language
   (`fr.js`, `sv.js`, `pl.js`).
2. Change the three references to the code at the top of the file, set the
   display name, and translate the values. Leave the keys alone.
3. Add one line to `index.html`, next to the other language files:

   ```html
   <script src="lang/fr.js"></script>
   ```

That is the whole change. The switcher button appears on its own, and no
application code is touched.

## Rules

Every language file defines every key that `en.js` defines. English is the
reference: a key missing from another language falls back to the English string
rather than rendering blank, but that is a safety net and not a licence to leave
keys out.

Translate values, never keys.

Some values are not translatable text and should be copied as they are:

- file paths and path examples, such as `C:\logs\valheim.log`
- command names, flags and code inside `<code>` tags
- product names: Valheim, WindowsGSM, SteamCMD, Docker, PlayFab, Iron Gate AB

Keys ending in a bare value, such as the world modifier names, follow the
wording the game itself uses in that language. The point of this tool is that
someone can match what they see in the in-game menu.

## Checking a file

`check-languages.js` compares every language against English and reports keys
that are missing or extra:

```bash
node lang/check-languages.js
```

It exits non-zero when a language is incomplete or fails to load, so it is
worth running before opening a pull request. A file that fails to parse is
reported and the remaining languages are still checked, so one broken file does
not hide the state of the rest.

Language buttons appear in the order English first, then the rest
alphabetically.
