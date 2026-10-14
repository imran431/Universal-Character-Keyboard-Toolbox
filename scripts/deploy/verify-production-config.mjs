import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const netlify = await readFile(path.join(root, 'netlify.toml'), 'utf8');
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const restoreScript = await readFile(
  path.join(root, 'scripts', 'unicode', 'restore-search-index.mjs'),
  'utf8'
);
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const buildCommand = netlify.match(/command\s*=\s*"([^"]+)"/)?.[1] ?? '';
assert(
  buildCommand.includes('npm run unicode:restore'),
  'Netlify builds must restore the versioned Unicode snapshot.'
);
assert(
  !buildCommand.includes('unicode:prepare') && !buildCommand.includes('unicode:sync'),
  'Ordinary Netlify builds must not depend on live Unicode.org downloads.'
);
assert(
  packageJson.scripts?.['unicode:restore'] === 'node scripts/unicode/restore-search-index.mjs',
  'package.json must expose the pinned Unicode snapshot restore command.'
);
assert(
  restoreScript.includes('/releases/download/'),
  'Unicode restore must use the versioned GitHub release snapshot.'
);
assert(
  restoreScript.includes("createHash('sha256')"),
  'Unicode restore must verify the published SHA-256 checksum.'
);

const csp = netlify.match(/Content-Security-Policy\s*=\s*"([^"]+)"/)?.[1] ?? '';
assert(csp.includes("worker-src 'self'"), "Netlify CSP must explicitly allow same-origin Web Workers.");

const searchBlock = netlify.match(
  /\[\[headers\]\]\s*\n\s*for\s*=\s*"\/data\/search\/\*"([\s\S]*?)(?=\n\[\[headers\]\]|$)/
)?.[1] ?? '';

assert(searchBlock.length > 0, 'Missing /data/search/* cache policy.');
assert(!/immutable/i.test(searchBlock), 'Fixed-name search assets must not use immutable caching.');
assert(!/max-age=31536000/i.test(searchBlock), 'Fixed-name search assets must not use a one-year browser cache.');
assert(/stale-while-revalidate/i.test(searchBlock), 'Search assets should permit stale-while-revalidate.');

const astroBlock = netlify.match(
  /\[\[headers\]\]\s*\n\s*for\s*=\s*"\/_astro\/\*"([\s\S]*?)(?=\n\[\[headers\]\]|$)/
)?.[1] ?? '';
assert(/immutable/i.test(astroBlock), 'Hashed Astro assets should retain immutable caching.');

if (failures.length > 0) {
  console.error('Production configuration verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Production configuration verified: deploys use the pinned Unicode snapshot, worker CSP, and safe cache policies.');
}
