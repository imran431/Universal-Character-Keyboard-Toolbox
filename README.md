# Universal Character & Keyboard Toolbox

A static-first Astro project for finding, copying, typing, and understanding Unicode characters and keyboard symbols.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Quality checks

```bash
npm run build
npx playwright install chromium
npm run test:e2e
```

The Playwright suite checks desktop and mobile overflow, core SEO metadata, and serious/critical accessibility issues.

## Production URL

Before any public deployment, configure the final canonical domain:

```bash
SITE_URL=https://your-domain.com npm run build
```

On Netlify, add `SITE_URL` as an environment variable. Do not deploy with the localhost fallback.

## Deployment target

The project is static and Netlify-ready. `netlify.toml` publishes the `dist` directory and applies baseline security/cache headers.

## Architecture guardrails

- Static HTML first.
- JavaScript only for user interactions that need it.
- No backend or database for core character lookup.
- No mass indexation of raw Unicode records.
- Only verified typing instructions should become indexable content.
- Keep search/filter states out of the index.
- Keep every primary action usable on mobile and by keyboard.
