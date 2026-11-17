# Agent operating rules

These rules apply to every change made in this repository. They are checked by `tests/hygiene.test.js` and by human review.

## 1. Keep no real data in the repository

Never commit actual account identifiers, tokens, absolute filesystem paths, or production secrets. Use placeholders and reference `docs/CONFIG.md` for where the real values live. Every example value in documentation must be a placeholder, not a real value.

## 2. Do not use timers, polls, or wait loops

Do not use any clock-based mechanism to wake up and look for work. Replace polling with an event trigger: a file watch, a queue write, a hook, a callback, or a signal. If no event trigger exists and polling is temporarily necessary, state the measured idle cost of the poll and annotate it with `poll-ok: <reason>`.

## 3. Declare every external setting in `docs/CONFIG.md`

Every configuration value that does not live inside the repository — store path, vault directory, project registry, operator account allowlist, PF base URL, PF token environment variable name, and Forge URL — must be declared in `docs/CONFIG.md`. Do not duplicate those values elsewhere.

## 4. Run `npm test` before finishing

Execute `npm test` (which invokes `node --test tests/`) and confirm it passes before considering the change complete. If the test fails, fix the failure before submitting.
