import process from 'node:process';

const input = process.argv[2] ?? process.env.SITE_URL ?? process.env.URL;

if (!input) {
  console.error('Usage: npm run deploy:verify:live -- https://your-site.netlify.app');
  process.exit(1);
}

let base;
try {
  base = new URL(input);
} catch {
  console.error(`Invalid site URL: ${input}`);
  process.exit(1);
}

if (base.protocol !== 'https:' || ['localhost', '127.0.0.1'].includes(base.hostname)) {
  console.error('Live verification requires a public HTTPS site URL.');
  process.exit(1);
}

base.pathname = '/';
base.search = '';
base.hash = '';

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function fetchChecked(pathname, options = {}) {
  const url = new URL(pathname, base);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      ...options
    });
  } catch (error) {
    failures.push(
      `Failed to fetch ${url.href}: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function extractMeta(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of tags) {
    const nameMatch = tag.match(/\bname=["']([^"']+)["']/i);
    const contentMatch = tag.match(/\bcontent=["']([^"']*)["']/i);

    if (nameMatch?.[1]?.toLowerCase() === name.toLowerCase()) {
      return contentMatch?.[1] ?? '';
    }
  }

  return '';
}

function extractCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];

  for (const tag of tags) {
    const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1] ?? '';
    if (!rel.split(/\s+/).some((value) => value.toLowerCase() === 'canonical')) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? '';
  }

  return '';
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) =>
    match[1]
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  );
}

const homeResponse = await fetchChecked('/');
if (homeResponse) {
  const homeHtml = await homeResponse.text();

  assert(homeResponse.ok, `Homepage returned HTTP ${homeResponse.status}.`);
  assert(
    extractCanonical(homeHtml) === base.href,
    `Homepage canonical must be ${base.href}.`
  );
  assert(
    /index,follow/i.test(extractMeta(homeHtml, 'robots')),
    'Homepage must be index,follow.'
  );
  assert(!/localhost|127\.0\.0\.1/i.test(homeHtml), 'Homepage HTML contains a localhost URL.');

  const csp = homeResponse.headers.get('content-security-policy') ?? '';
  assert(csp.includes("worker-src 'self'"), 'Live CSP must allow same-origin Web Workers.');
  assert(
    (homeResponse.headers.get('x-content-type-options') ?? '').toLowerCase() === 'nosniff',
    'Live site must send X-Content-Type-Options: nosniff.'
  );
}

const robotsResponse = await fetchChecked('/robots.txt');
if (robotsResponse) {
  const robots = await robotsResponse.text();
  assert(robotsResponse.ok, `robots.txt returned HTTP ${robotsResponse.status}.`);
  assert(/User-agent:\s*\*/i.test(robots), 'robots.txt must contain a default user-agent rule.');
  assert(/User-agent:\s*OAI-SearchBot/i.test(robots), 'robots.txt must explicitly allow OAI-SearchBot.');
  assert(
    robots.includes(`Sitemap: ${new URL('/sitemap-index.xml', base).href}`),
    'robots.txt sitemap URL must use the live origin.'
  );
  assert(!/localhost|127\.0\.0\.1/i.test(robots), 'robots.txt contains a localhost URL.');
}

const sitemapIndexResponse = await fetchChecked('/sitemap-index.xml');
let sitemapUrls = [];
if (sitemapIndexResponse) {
  const sitemapIndex = await sitemapIndexResponse.text();
  assert(
    sitemapIndexResponse.ok,
    `sitemap-index.xml returned HTTP ${sitemapIndexResponse.status}.`
  );
  assert(!/localhost|127\.0\.0\.1/i.test(sitemapIndex), 'Sitemap index contains a localhost URL.');

  const childSitemaps = extractLocs(sitemapIndex);
  assert(childSitemaps.length > 0, 'Sitemap index contains no child sitemaps.');

  for (const childUrl of childSitemaps) {
    const childResponse = await fetchChecked(childUrl);
    if (!childResponse) continue;

    const xml = await childResponse.text();
    assert(childResponse.ok, `Child sitemap returned HTTP ${childResponse.status}: ${childUrl}`);
    sitemapUrls.push(...extractLocs(xml));
  }
}

for (const pathname of ['/', '/symbols/', '/symbols/degree-sign/', '/tools/', '/unicode/']) {
  const expected = new URL(pathname, base).href;
  assert(sitemapUrls.includes(expected), `Sitemap is missing reviewed route ${pathname}.`);
}
assert(
  !sitemapUrls.includes(new URL('/library/', base).href),
  'Personal saved-character library must not appear in the sitemap.'
);

const libraryResponse = await fetchChecked('/library/');
if (libraryResponse) {
  const libraryHtml = await libraryResponse.text();
  assert(libraryResponse.ok, `Saved-character library returned HTTP ${libraryResponse.status}.`);
  assert(
    /noindex,follow/i.test(extractMeta(libraryHtml, 'robots')),
    'Saved-character library must remain noindex,follow.'
  );
}

const searchResponse = await fetchChecked('/data/search/unicode-18.0-search.json');
if (searchResponse) {
  const searchText = await searchResponse.text();
  assert(searchResponse.ok, `Unicode search asset returned HTTP ${searchResponse.status}.`);

  const cache = searchResponse.headers.get('cache-control') ?? '';
  assert(!/immutable/i.test(cache), 'Fixed-name Unicode search asset must not be immutable.');
  assert(/max-age=86400/i.test(cache), 'Unicode search asset must use the one-day browser cache.');
  assert(
    /stale-while-revalidate=604800/i.test(cache),
    'Unicode search asset must permit one week of stale-while-revalidate.'
  );

  try {
    const payload = JSON.parse(searchText);
    assert(payload.unicodeVersion === '18.0.0', 'Live search asset must be Unicode 18.0.0.');
    assert(
      Array.isArray(payload.records) && payload.records.length > 10_000,
      'Live search asset is missing the expected Unicode records.'
    );
  } catch {
    failures.push('Live Unicode search asset is not valid JSON.');
  }
}

const missingResponse = await fetchChecked('/this-route-should-not-exist-live-check/');
if (missingResponse) {
  const missingHtml = await missingResponse.text();
  assert(missingResponse.status === 404, `Missing route returned HTTP ${missingResponse.status}, expected 404.`);
  assert(
    /noindex,follow/i.test(extractMeta(missingHtml, 'robots')),
    '404 page must remain noindex,follow.'
  );
}

if (failures.length > 0) {
  console.error(`Live deployment verification failed for ${base.href}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Live deployment verified: ${base.href} has correct canonicals, crawl controls, security headers, sitemap coverage, and Unicode search data.`
  );
}
