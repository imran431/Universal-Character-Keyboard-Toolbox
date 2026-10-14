import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const netlify = await readFile(path.join(root, 'netlify.toml'), 'utf8');
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

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
  console.log('Production configuration verified: worker CSP and cache policies are safe.');
}
