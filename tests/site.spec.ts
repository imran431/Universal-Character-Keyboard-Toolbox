import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const indexablePaths = [
  '/',
  '/symbols/',
  '/symbols/degree-sign/',
  '/symbols/copyright-sign/',
  '/symbols/registered-sign/',
  '/symbols/trademark-sign/',
  '/symbols/euro-sign/',
  '/symbols/em-dash/',
  '/symbols/check-mark/',
  '/symbols/right-arrow/',
  '/symbols/en-dash/',
  '/symbols/ellipsis/',
  '/symbols/plus-minus/',
  '/symbols/infinity/',
  '/symbols/bullet/',
  '/symbols/pound-sign/',
  '/symbols/yen-sign/',
  '/symbols/indian-rupee-sign/',
  '/symbols/math/',
  '/symbols/currency/',
  '/symbols/punctuation/',
  '/symbols/arrows/',
  '/symbols/status/',
  '/symbols/legal/',
  '/unicode/',
  '/typing/'
];

for (const path of indexablePaths) {
  test(`${path} has essential SEO metadata`, async ({ page }) => {
    await page.goto(path);

    await expect(page.locator('h1')).toHaveCount(1);

    const title = (await page.title()).trim();
    expect(title.length).toBeGreaterThanOrEqual(15);
    expect(title.length).toBeLessThanOrEqual(65);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.trim().length ?? 0).toBeGreaterThanOrEqual(50);
    expect(description?.trim().length ?? 0).toBeLessThanOrEqual(180);

    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index,follow/);

    const schemaBlocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemaBlocks.length).toBeGreaterThan(0);
    for (const schema of schemaBlocks) {
      expect(() => JSON.parse(schema)).not.toThrow();
    }
  });

  test(`${path} has no horizontal overflow`, async ({ page }) => {
    await page.goto(path);
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });

  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(serious).toEqual([]);
  });
}

test('404 page stays out of the index', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex,follow/);
});

test('search understands curated aliases', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox', { name: 'Search characters' });
  const resultGrid = page.locator('[data-unicode-result-grid]');

  await search.fill('tick');
  await expect(resultGrid.getByText('Check Mark', { exact: true })).toBeVisible();
  await expect(page.locator('[data-popular-section]')).toBeHidden();
});

test('search understands exact characters, code points, and HTML numeric entities', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox', { name: 'Search characters' });
  const resultGrid = page.locator('[data-unicode-result-grid]');

  for (const query of ['°', 'U+00B0', '&#176;']) {
    await search.fill(query);
    await expect(resultGrid.getByText('Degree Sign', { exact: true })).toBeVisible();
    await expect(resultGrid.getByText('U+00B0', { exact: false })).toBeVisible();
  }

  await search.fill('');
  await expect(page.locator('[data-popular-section]')).toBeVisible();
  await expect(page.locator('[data-unicode-results]')).toBeHidden();
});

test('full Unicode index finds a non-featured named character', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox', { name: 'Search characters' });

  await search.fill('snowman');

  const resultGrid = page.locator('[data-unicode-result-grid]');
  await expect(resultGrid.getByText('SNOWMAN', { exact: true })).toBeVisible();
  await expect(resultGrid.getByText('U+2603', { exact: false })).toBeVisible();
});

test('algorithmic Unicode names resolve without expanding huge ranges', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox', { name: 'Search characters' });

  await search.fill('CJK UNIFIED IDEOGRAPH-4E00');

  const resultGrid = page.locator('[data-unicode-result-grid]');
  await expect(resultGrid.getByText('CJK UNIFIED IDEOGRAPH-4E00', { exact: true })).toBeVisible();
  await expect(resultGrid.getByText('U+4E00', { exact: false })).toBeVisible();
});

test('search results stay responsive after the full index loads', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Search characters' }).fill('arrow');

  await expect(page.locator('[data-unicode-result-grid] .symbol-card').first()).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});


test('symbols hub links every curated category with crawlable anchors', async ({ page }) => {
  await page.goto('/symbols/');

  for (const href of [
    '/symbols/math/',
    '/symbols/currency/',
    '/symbols/punctuation/',
    '/symbols/arrows/',
    '/symbols/status/',
    '/symbols/legal/'
  ]) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
});

test('Unicode explorer searches official names and code points', async ({ page }) => {
  await page.goto('/unicode/');
  const search = page.getByRole('searchbox', { name: 'Character, name, alias or code point' });
  const grid = page.locator('[data-explorer-grid]');

  await search.fill('snowman');
  await expect(grid.getByText('SNOWMAN', { exact: true })).toBeVisible();
  await expect(grid.getByText('U+2603', { exact: false })).toBeVisible();

  await search.fill('U+2192');
  await expect(grid.getByText('Rightwards Arrow', { exact: true })).toBeVisible();
  await expect(grid.getByText('U+2192', { exact: false })).toBeVisible();
});

test('Unicode explorer resolves curated aliases and stays responsive', async ({ page }) => {
  await page.goto('/unicode/');
  const search = page.getByRole('searchbox', { name: 'Character, name, alias or code point' });
  const grid = page.locator('[data-explorer-grid]');

  await search.fill('tick');
  await expect(grid.getByText('Check Mark', { exact: true })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});

test('degree page links back into its category hierarchy', async ({ page }) => {
  await page.goto('/symbols/degree-sign/');
  await expect(page.locator('a[href="/symbols/math/"]').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Similar-looking characters' })).toBeVisible();
});


test('flagship character pages expose reviewed sources', async ({ page }) => {
  for (const path of [
    '/symbols/degree-sign/',
    '/symbols/copyright-sign/',
    '/symbols/registered-sign/',
    '/symbols/trademark-sign/',
    '/symbols/euro-sign/',
    '/symbols/em-dash/',
    '/symbols/check-mark/',
    '/symbols/right-arrow/',
    '/symbols/en-dash/',
    '/symbols/ellipsis/',
    '/symbols/plus-minus/',
    '/symbols/infinity/',
    '/symbols/bullet/',
    '/symbols/pound-sign/',
    '/symbols/yen-sign/',
    '/symbols/indian-rupee-sign/'
  ]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'Reviewed sources' })).toBeVisible();
    await expect(page.locator('.source-links a').first()).toHaveAttribute('href', /^https:\/\//);
  }
});

test('flagship category cards link to reviewed detail pages', async ({ page }) => {
  const cases = [
    ['/symbols/legal/', '/symbols/copyright-sign/'],
    ['/symbols/legal/', '/symbols/registered-sign/'],
    ['/symbols/legal/', '/symbols/trademark-sign/'],
    ['/symbols/currency/', '/symbols/euro-sign/'],
    ['/symbols/punctuation/', '/symbols/em-dash/'],
    ['/symbols/status/', '/symbols/check-mark/'],
    ['/symbols/arrows/', '/symbols/right-arrow/'],
    ['/symbols/punctuation/', '/symbols/en-dash/'],
    ['/symbols/punctuation/', '/symbols/ellipsis/'],
    ['/symbols/punctuation/', '/symbols/bullet/'],
    ['/symbols/math/', '/symbols/plus-minus/'],
    ['/symbols/math/', '/symbols/infinity/'],
    ['/symbols/currency/', '/symbols/pound-sign/'],
    ['/symbols/currency/', '/symbols/yen-sign/'],
    ['/symbols/currency/', '/symbols/indian-rupee-sign/']
  ] as const;

  for (const [categoryPath, detailHref] of cases) {
    await page.goto(categoryPath);
    await expect(page.locator(`a[href="${detailHref}"]`).first()).toBeVisible();
  }
});


test('flagship detail pages build contextual related-character links', async ({ page }) => {
  for (const path of [
    '/symbols/em-dash/',
    '/symbols/en-dash/',
    '/symbols/euro-sign/',
    '/symbols/pound-sign/',
    '/symbols/plus-minus/',
    '/symbols/infinity/'
  ]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: 'Related characters' })).toBeVisible();
    await expect(page.locator('.related-card').first()).toBeVisible();
  }
});

test('second flagship batch exposes copy, code, related and source sections', async ({ page }) => {
  for (const path of [
    '/symbols/en-dash/',
    '/symbols/ellipsis/',
    '/symbols/plus-minus/',
    '/symbols/infinity/',
    '/symbols/bullet/',
    '/symbols/pound-sign/',
    '/symbols/yen-sign/',
    '/symbols/indian-rupee-sign/'
  ]) {
    await page.goto(path);
    await expect(page.getByRole('button', { name: /^Copy / }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Character codes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reviewed sources' })).toBeVisible();
  }
});


test('typing environment selector highlights without hiding methods', async ({ page }) => {
  await page.goto('/symbols/degree-sign/');

  const methods = page.locator('[data-typing-method]');
  const total = await methods.count();
  expect(total).toBeGreaterThanOrEqual(3);

  await page.getByRole('button', { name: 'Microsoft Word' }).click();

  await expect(page.locator('[data-typing-status]')).toContainText('Microsoft Word');
  await expect(page.locator('[data-typing-method][data-recommended="true"]')).toHaveCount(1);
  await expect(methods).toHaveCount(total);
  await expect(page.locator('[data-typing-method]:visible')).toHaveCount(total);
});

test('typing environment preference survives reload', async ({ page }) => {
  await page.goto('/symbols/right-arrow/');
  const windows = page.getByRole('button', { name: 'Windows' });

  await windows.click();
  await expect(windows).toHaveAttribute('aria-pressed', 'true');

  await page.reload();
  await expect(page.getByRole('button', { name: 'Windows' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-typing-method][data-recommended="true"]')).toHaveCount(1);
});

test('typing hub links to reviewed character guides and first-party sources', async ({ page }) => {
  await page.goto('/typing/');

  await expect(page.getByRole('heading', { name: 'How to Type Special Characters' })).toBeVisible();
  await expect(page.locator('a[href="/symbols/degree-sign/"]').first()).toBeVisible();
  await expect(page.locator('a[href*="support.microsoft.com"]').first()).toBeVisible();
  await expect(page.locator('a[href*="support.apple.com"]').first()).toBeVisible();
});
