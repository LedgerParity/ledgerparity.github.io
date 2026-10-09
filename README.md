# LedgerParity documentation

This repository hosts the LedgerParity documentation site at
<https://ledgerparity.github.io/>.

Static, build-free HTML/CSS and JavaScript (see [using-the-site](https://ledgerparity.github.io/)). The [local preflight](https://ledgerparity.github.io/preflight.html) checks canonical payment JSON in the browser; it does not upload data or perform reconciliation.

- `index.html` — the documentation page.
- `preflight.html` and `assets/payment-preflight.mjs` — local JSON preflight and its UI.
- `assets/` — brand-styled CSS and images.
- `.nojekyll` — tells GitHub Pages to serve files as-is.

Run the preflight tests with `node --test tests/*.test.mjs` (Node 22+).

Source of truth for the content is the repositories
[`ledger-parity-core`](https://github.com/LedgerParity/ledger-parity-core),
[`ledger-parity-connectors`](https://github.com/LedgerParity/ledger-parity-connectors),
and [`ledger-parity-cli`](https://github.com/LedgerParity/ledger-parity-cli).
Keep claims and status rows in sync with their `DECISIONS.md`, `ROADMAP.md`,
`PROJECT_HANDOFF.md`, and `docs/*`.

MIT licensed. Brand usage and honesty rules from the organization's
`GOVERNANCE.md` remain applicable.
