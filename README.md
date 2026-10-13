# Universal Character & Keyboard Toolbox

A static-first Astro project for finding, copying, typing, and understanding Unicode characters and keyboard symbols.

## Local development

Requirements: Node.js 22+ and npm.

First setup:

```bash
npm install
npm run unicode:prepare
npm run dev
```

Open `http://localhost:4321`.

`unicode:prepare` downloads version-pinned Unicode 18.0.0 source files, verifies the normalized data, and generates the deferred browser search asset. Normal Astro builds do not fetch Unicode.org.

## Quality checks

After the Unicode search asset exists:

```bash
npm run build
npx playwright install chromium
npm run test:e2e
```

The Playwright suite checks desktop and mobile overflow, core SEO metadata, full Unicode search behavior, and serious/critical accessibility issues.

When Unicode data changes, run the complete pipeline again:

```bash
npm run unicode:prepare
npm run build
npm run test:e2e
```

## Production URL

Before any public deployment, configure the final canonical domain:

```bash
SITE_URL=https://your-domain.com npm run build
```

On Netlify, add `SITE_URL` as an environment variable. Do not deploy with the localhost fallback.

## Deployment target

The project is static and Netlify-ready. `netlify.toml` prepares the version-pinned Unicode search data, builds the static site, publishes `dist`, and applies baseline security/cache headers.

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
