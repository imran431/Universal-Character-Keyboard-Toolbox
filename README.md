# Universal Character & Keyboard Toolbox

A static-first Astro project for finding, copying, typing, and understanding Unicode characters and keyboard symbols.

## Local development

Requirements: Node.js 22+ and npm.

First setup:

```bash
npm install
npm run unicode:restore
npm run dev
```

Open `http://localhost:4321`.

`unicode:restore` downloads the checksum-verified Unicode 18.0.0 browser search snapshot from the project's versioned GitHub release. Normal development, tests, CI, and Netlify deploys do not depend on Unicode.org being online.

Maintainers use `npm run unicode:prepare` only when intentionally refreshing the pinned Unicode snapshot from the authoritative Unicode.org sources.

## Quality checks

Install Playwright once, then run the complete gate:

```bash
npx playwright install chromium
npm test
```

`npm test` restores the pinned Unicode snapshot if needed, builds and type-checks the site, verifies SEO/indexation and production deployment configuration, then runs desktop/mobile Playwright and accessibility coverage.

When Unicode data or its generator changes, maintainers run:

```bash
npm run unicode:prepare
npm run unicode:verify
npm test
```

The dedicated GitHub Actions snapshot workflow publishes the deterministic search JSON and SHA-256 checksum under the versioned `unicode-18.0.0` release tag.

## Production URL

For local production-style builds you can override the canonical site explicitly:

```bash
SITE_URL=https://your-domain.com npm run build
```

On Netlify, Astro automatically falls back to Netlify's production `URL` environment variable. Set `SITE_URL` only when you want to override that value, such as after moving to a preferred custom canonical domain.

## Deployment target

The project is static and Netlify-ready. `netlify.toml` restores the checksum-verified, version-pinned Unicode search snapshot from GitHub Releases, builds the static site, publishes `dist`, and applies baseline security/cache headers. Ordinary deploys do not download from Unicode.org.

## Architecture guardrails

- Static HTML first.
- JavaScript only for interactions that need it.
- The larger Unicode search dataset loads only after a user searches.
- Full Unicode search runs in a Web Worker to protect interaction responsiveness.
- No backend or database for core character lookup.
- No mass indexation of raw Unicode records.
- Only verified typing instructions should become indexable content.
- Keep search/filter states out of the index.
- Keep every primary action usable on mobile and by keyboard.
