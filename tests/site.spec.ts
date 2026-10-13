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
  '/typing/',
  '/tools/',
  '/tools/shortcut-finder/',
  '/tools/alt-code-finder/',
  '/tools/accent-keyboard/',
  '/tools/unicode-converter/'
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


test('shortcut finder filters by query and environment', async ({ page }) => {
  await page.goto('/tools/shortcut-finder/');

  const search = page.getByRole('searchbox', { name: 'Character, name, alias or code point' });
  await search.fill('degree');
  await expect(page.locator('[data-shortcut-card]:visible')).toHaveCount(3);
  await expect(page.getByText('Degree Symbol', { exact: true }).first()).toBeVisible();

  await page.getByRole('button', { name: 'Windows' }).click();
  await expect(page.locator('[data-shortcut-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-shortcut-card]:visible')).toContainText('Hold Alt and type 0176');

  await page.getByRole('button', { name: 'Microsoft Word' }).click();
  await expect(page.locator('[data-shortcut-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-shortcut-card]:visible')).toContainText('00B0');
});

test('shortcut finder keeps method sources crawlable and usable', async ({ page }) => {
  await page.goto('/tools/shortcut-finder/');
  await page.getByRole('searchbox', { name: 'Character, name, alias or code point' }).fill('copyright');

  const visible = page.locator('[data-shortcut-card]:visible');
  await expect(visible).toHaveCount(3);
  await expect(visible.locator('a[href*="support.microsoft.com"]').first()).toBeVisible();
  await expect(visible.getByRole('button', { name: /Copy Copyright Symbol/ }).first()).toBeVisible();
});

test('Alt Code Finder exposes only reviewed numeric keypad codes', async ({ page }) => {
  await page.goto('/tools/alt-code-finder/');
  const search = page.getByRole('searchbox', { name: 'Symbol, name, Unicode code point or Alt-code digits' });

  await search.fill('degree');
  await expect(page.locator('[data-alt-code-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-alt-code-card]:visible')).toContainText('Alt + 0176');

  await search.fill('0153');
  await expect(page.locator('[data-alt-code-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-alt-code-card]:visible')).toContainText('Trademark Symbol');

  await search.fill('infinity');
  await expect(page.locator('[data-alt-code-card]:visible')).toHaveCount(0);
  await expect(page.locator('[data-alt-code-empty]')).toBeVisible();
});

test('tool pages remain responsive after filtering', async ({ page }) => {
  for (const [path, searchName, query] of [
    ['/tools/shortcut-finder/', 'Character, name, alias or code point', 'copyright'],
    ['/tools/alt-code-finder/', 'Symbol, name, Unicode code point or Alt-code digits', 'euro']
  ] as const) {
    await page.goto(path);
    await page.getByRole('searchbox', { name: searchName }).fill(query);

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  }
});


test('critical pages fit a 320px viewport with primary navigation intact', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });

  for (const path of [
    '/',
    '/typing/',
    '/unicode/',
    '/tools/',
    '/tools/shortcut-finder/',
    '/tools/alt-code-finder/',
    '/tools/accent-keyboard/',
    '/tools/unicode-converter/',
    '/library/'
  ]) {
    await page.goto(path);

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    await expect(page.locator('nav a[href="/tools/"]')).toBeVisible();
  }
});


test('accent keyboard inserts and filters characters', async ({ page }) => {
  await page.goto('/tools/accent-keyboard/');

  const search = page.getByRole('searchbox', { name: 'Search accented characters' });
  const pad = page.getByRole('textbox', { name: 'Accent keyboard writing pad' });

  await page.locator('[data-accent-key][data-character="á"]').click();
  await expect(pad).toHaveValue('á');

  await page.locator('[data-accent-key][data-character="ñ"]').click();
  await expect(pad).toHaveValue('áñ');

  await search.fill('cedilla');
  await expect(page.locator('[data-accent-key]:visible').first()).toBeVisible();

  await page.getByRole('button', { name: 'Uppercase' }).click();
  await expect(page.locator('[data-accent-key][data-character="Ç"]')).toBeVisible();
  await expect(page.locator('[data-accent-key][data-character="ç"]')).toBeHidden();

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(pad).toHaveValue('');
});

test('Unicode converter handles BMP and supplementary code points', async ({ page }) => {
  await page.goto('/tools/unicode-converter/');

  await page.getByRole('textbox', { name: 'Text to convert' }).fill('A→😀');

  await expect(page.getByRole('textbox', { name: 'Unicode code points output' }))
    .toHaveValue('U+0041 U+2192 U+1F600');
  await expect(page.getByRole('textbox', { name: 'JavaScript escape output' }))
    .toHaveValue('\\u0041\\u2192\\u{1F600}');
  await expect(page.getByRole('textbox', { name: 'HTML decimal output' }))
    .toHaveValue('&#65;&#8594;&#128512;');
  await expect(page.locator('[data-converter-count]')).toContainText('3 Unicode code points');
});

test('Unicode converter decodes multiple supported notations and rejects surrogates', async ({ page }) => {
  await page.goto('/tools/unicode-converter/');

  const input = page.getByRole('textbox', { name: 'Code points to decode' });
  const output = page.getByRole('textbox', { name: 'Decoded text' });

  await input.fill('U+00B0 0x2192 \\u{1F600}');
  await expect(output).toHaveValue('°→😀');
  await expect(page.locator('[data-decode-status]')).toContainText('Decoded 3 Unicode code points');

  await input.fill('U+D800');
  await expect(output).toHaveValue('');
  await expect(page.locator('[data-decode-status]')).toContainText('Ignored invalid token');
});

test('tools hub links to accent keyboard, Unicode converter and saved characters', async ({ page }) => {
  await page.goto('/tools/');
  await expect(page.locator('a[href="/tools/accent-keyboard/"]')).toBeVisible();
  await expect(page.locator('a[href="/tools/unicode-converter/"]')).toBeVisible();
  await expect(page.locator('a[href="/library/"]')).toBeVisible();
});

test('saved character library stays out of the search index and remains accessible', async ({ page }) => {
  await page.goto('/library/');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex,follow/);
  await expect(page.locator('h1')).toHaveText('Saved Characters');

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) =>
    ['serious', 'critical'].includes(violation.impact ?? '')
  );
  expect(serious).toEqual([]);
});

test('favorite characters persist locally and can be removed from the library', async ({ page }) => {
  await page.goto('/symbols/degree-sign/');

  const favorite = page.locator('[data-favorite-character="°"]');
  await expect(favorite).toHaveAccessibleName('Add Degree Symbol to favorites');
  await favorite.click();
  await expect(favorite).toHaveAttribute('aria-pressed', 'true');
  await expect(favorite).toHaveAccessibleName('Remove Degree Symbol from favorites');

  await page.goto('/library/');
  const favorites = page.locator('[data-favorites-grid]');
  await expect(favorites.getByText('Degree Symbol', { exact: true })).toBeVisible();
  await expect(favorites.getByText('U+00B0', { exact: true })).toBeVisible();

  await favorites.getByRole('button', { name: 'Remove Degree Symbol from favorites' }).click();
  await expect(page.locator('[data-favorites-empty]')).toBeVisible();
});

test('accent keyboard usage flows into recent characters and can be cleared', async ({ page }) => {
  await page.goto('/tools/accent-keyboard/');
  await page.locator('[data-accent-key][data-character="á"]').click();

  await page.goto('/library/');
  const recents = page.locator('[data-recents-grid]');
  await expect(recents.getByText('a with acute', { exact: true })).toBeVisible();
  await expect(recents.getByText('U+00E1', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Clear recent' }).click();
  await expect(page.locator('[data-recents-empty]')).toBeVisible();
});


test('Unicode Explorer results can be saved without a detail page', async ({ page }) => {
  await page.goto('/unicode/');

  const search = page.getByRole('searchbox', { name: 'Character, name, alias or code point' });
  await search.fill('snowman');

  const grid = page.locator('[data-explorer-grid]');
  const save = grid.locator('[data-favorite-explorer="☃"]');
  await expect(save).toBeVisible();
  await expect(save).toHaveAccessibleName('Add SNOWMAN to favorites');
  await save.click();
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  await expect(save).toHaveAccessibleName('Remove SNOWMAN from favorites');

  await page.goto('/library/');
  const favorites = page.locator('[data-favorites-grid]');
  await expect(favorites.getByText('SNOWMAN', { exact: true })).toBeVisible();
  await expect(favorites.getByText('U+2603', { exact: true })).toBeVisible();
});
