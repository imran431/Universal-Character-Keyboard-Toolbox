import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const manifestPath = path.join(root, 'data', 'seo', 'indexable-routes.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const routes = manifest.routes ?? [];
const routeSet = new Set(routes);
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function routeToHtml(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const output = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...await walk(fullPath));
    else output.push(fullPath);
  }

  return output;
}

assert(routes.length > 0, 'SEO indexation manifest is empty.');
assert(routeSet.size === routes.length, 'SEO indexation manifest contains duplicate routes.');

for (const route of routes) {
  assert(route.startsWith('/') && route.endsWith('/'), `Indexable route must use leading and trailing slashes: ${route}`);

  const htmlPath = routeToHtml(route);
  let html = '';

  try {
    html = await readFile(htmlPath, 'utf8');
  } catch {
    failures.push(`Indexable route did not build: ${route}`);
    continue;
  }

  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] ?? '';
  assert(/\bindex\b/i.test(robots) && /\bfollow\b/i.test(robots), `Indexable route lacks index,follow robots metadata: ${route}`);

  const canonicals = html.match(/<link\s+rel=["']canonical["'][^>]*>/gi) ?? [];
  assert(canonicals.length === 1, `Expected exactly one canonical link on ${route}; found ${canonicals.length}`);

  const h1s = html.match(/<h1\b/gi) ?? [];
  assert(h1s.length === 1, `Expected exactly one H1 on ${route}; found ${h1s.length}`);
}

const allFiles = await walk(distDir);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const relative = path.relative(distDir, file).replaceAll(path.sep, '/');

  let route;
  if (relative === 'index.html') route = '/';
  else if (relative === '404.html') route = '/404.html';
  else if (relative.endsWith('/index.html')) route = `/${relative.slice(0, -'index.html'.length)}`;
  else continue;

  if (routeSet.has(route)) continue;

  const html = await readFile(file, 'utf8');
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)?.[1] ?? '';
  assert(/\bnoindex\b/i.test(robots), `Built HTML route is outside the SEO manifest but is not noindex: ${route}`);
}

const sitemapFiles = allFiles.filter((file) => /sitemap-\d+\.xml$/.test(file));
const sitemapRoutes = new Set();

for (const file of sitemapFiles) {
  const xml = await readFile(file, 'utf8');
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const pathname = new URL(match[1]).pathname;
    sitemapRoutes.add(pathname);
    assert(routeSet.has(pathname), `Sitemap contains a route outside the reviewed manifest: ${pathname}`);
  }
}

for (const route of routes) {
  assert(sitemapRoutes.has(route), `Reviewed indexable route is missing from sitemap: ${route}`);
}

if (failures.length > 0) {
  console.error('SEO indexation verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`SEO indexation verified: ${routes.length} reviewed routes, ${sitemapRoutes.size} sitemap URLs.`);
}
