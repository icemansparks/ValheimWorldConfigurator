# Contributing

Translations, corrections to modifier values, and fixes are all welcome.

## Before you open a pull request

Modifier names and values should be verified against a real dedicated server
rather than copied from a wiki. The manual shipped with the server is
incomplete in places and some wiki pages are years out of date. If you are
correcting a value, say in the pull request how you checked it.

For translations, see [`lang/README.md`](lang/README.md) and run:

```bash
node lang/check-languages.js
```

## Licensing of contributions

This project is licensed under the GNU Affero General Public License v3.0.

By contributing, you agree that:

1. You wrote the contribution yourself, or otherwise have the right to submit
   it under the AGPL-3.0.
2. You grant the project maintainer the right to license your contribution
   under other terms as well, including commercial terms.

Point 2 exists so the project can offer a commercial licence to anyone who
needs one without having to track down every past contributor for permission.
Your contribution stays available under the AGPL-3.0 regardless, and this
does not take your copyright away from you.

Add a line to your pull request saying you agree:

```
I agree to the contribution terms in CONTRIBUTING.md.
```
