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
  '/tools/copy-paste-symbols/',
  '/tools/shortcut-finder/',
  '/tools/alt-code-finder/',
  '/tools/accent-keyboard/',
  '/tools/diacritics-keyboard/',
  '/tools/unicode-converter/',
  '/tools/invisible-characters/',
  '/guides/',
  '/guides/keyboard-shortcuts-for-symbols/',
  '/guides/type-special-characters-windows/',
  '/guides/type-special-characters-mac/',
  '/guides/special-characters-google-docs/',
  '/guides/type-accents-on-iphone/',
  '/guides/math-symbols-on-keyboard/',
  '/guides/type-hashtag-number-sign/',
  '/guides/type-at-symbol/',
  '/guides/slash-backslash-pipe-symbols/',
  '/guides/quotation-marks-apostrophes/',
  '/guides/brackets-braces-parentheses/',
  '/guides/bullet-point-symbols/',
  '/guides/check-mark-cross-symbols/',
  '/guides/arrow-symbols-keyboard/',
  '/guides/alt-code-not-working/',
  '/guides/missing-symbol-square-box/',
  '/letters/',
  '/letters/a-with-accents/',
  '/letters/q-with-accents/',
  '/letters/x-with-accents/',
  '/about/',
  '/methodology/'
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

  test(`${path} has no serious accessibility violations`, async ({ page }, testInfo) => {
    if (path === '/tools/copy-paste-symbols/') {
      testInfo.setTimeout(75_000);
    }

    await page.goto(path);

    if (path === '/tools/copy-paste-symbols/') {
      await page.locator('[data-catalog-category]').evaluateAll((categories) => {
        for (const category of categories) {
          const cards = Array.from(category.querySelectorAll('[data-catalog-symbol]'));
          for (const card of cards.slice(4)) {
            card.remove();
          }
        }
      });
    }

    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    const seriousSummary = serious.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        html: node.html,
        failureSummary: node.failureSummary
      }))
    }));
    expect(
      serious,
      `${path} serious accessibility violations:\n${JSON.stringify(seriousSummary, null, 2)}`
    ).toEqual([]);
  });
}

test('homepage exposes the preferred site name only at the root', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Character Toolbox');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');

  const homeSchemas = (await page.locator('script[type="application/ld+json"]').allTextContents())
    .map((schema) => JSON.parse(schema));
  const websiteSchemas = homeSchemas.filter((schema) => schema['@type'] === 'WebSite');

  expect(websiteSchemas).toHaveLength(1);
  expect(websiteSchemas[0].name).toBe('Character Toolbox');
  expect(websiteSchemas[0].alternateName).toBe('Universal Character & Keyboard Toolbox');

  await page.goto('/tools/');
  const internalSchemas = (await page.locator('script[type="application/ld+json"]').allTextContents())
    .map((schema) => JSON.parse(schema));
  expect(internalSchemas.some((schema) => schema['@type'] === 'WebSite')).toBeFalsy();
});

test('robots.txt exposes the sitemap and OAI search crawl policy', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.ok()).toBeTruthy();

  const robots = await response.text();
  expect(robots).toContain('User-agent: *');
  expect(robots).toContain('Allow: /');
  expect(robots).toContain('User-agent: OAI-SearchBot');
  expect(robots).toContain('Sitemap: http://localhost:4321/sitemap-index.xml');
});

test('privacy page stays out of the search index', async ({ page }) => {
  await page.goto('/privacy/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex,follow/);
  await expect(page.locator('h1')).toHaveText('Privacy');
});

test('404 page stays out of the index', async ({ page }) => {
  await page.goto('/404.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex,follow/);
});

test('homepage keeps the popular character grid balanced and useful', async ({ page }) => {
  await page.goto('/');

  const cards = page.locator('[data-popular-section] .symbol-card');
  await expect(cards).toHaveCount(18);
  await expect(page.getByText('Rightwards Arrow', { exact: true })).toBeVisible();
  await expect(page.getByText('Pound Sign', { exact: true })).toBeVisible();
});

test('homepage quick-search chips teach search without adding URL states', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '→ Arrow' }).click();

  const search = page.getByRole('searchbox', { name: 'Search characters' });
  await expect(search).toHaveValue('right arrow');
  await expect(page.locator('[data-unicode-result-grid]').getByText('Rightwards Arrow', { exact: true })).toBeVisible();
  await expect(page.locator('[data-popular-section]')).toBeHidden();
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

test('curated category pages expose newly added practical symbols', async ({ page }) => {
  const cases = [
    ['/symbols/math/', 'N-Ary Summation', 'U+2211'],
    ['/symbols/math/', 'Integral', 'U+222B'],
    ['/symbols/currency/', 'Bitcoin Sign', 'U+20BF'],
    ['/symbols/currency/', 'Turkish Lira Sign', 'U+20BA'],
    ['/symbols/punctuation/', 'Per Mille Sign', 'U+2030'],
    ['/symbols/punctuation/', 'Prime', 'U+2032']
  ] as const;

  for (const [path, name, codePoint] of cases) {
    await page.goto(path);
    await expect(page.getByText(name, { exact: true })).toBeVisible();
    await expect(page.getByText(codePoint, { exact: false })).toBeVisible();
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

test('symbol glyphs keep readable sizing across shared surfaces', async ({ page }) => {
  const cases = [
    ['/tools/shortcut-finder/', '.shortcut-glyph', 30],
    ['/tools/alt-code-finder/', '.shortcut-glyph', 30],
    ['/', '.symbol-glyph', 28],
    ['/symbols/math/', '.symbol-glyph', 28],
    ['/symbols/degree-sign/', '.answer-glyph', 48]
  ] as const;

  for (const [path, selector, minimumFontSize] of cases) {
    await page.goto(path);
    const glyph = page.locator(selector).first();
    await expect(glyph).toBeVisible();

    const styles = await glyph.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        display: computed.display,
        fontSize: Number.parseFloat(computed.fontSize),
        textAlign: computed.textAlign
      };
    });

    expect(styles.display).toBe('grid');
    expect(styles.fontSize).toBeGreaterThanOrEqual(minimumFontSize);
    expect(styles.textAlign).toBe('center');
  }
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
  const degree = page.locator('[data-alt-code-card][data-alt-code-digits="0176"]');
  await expect(degree).toBeVisible();
  await expect(degree).toHaveAttribute('data-alt-code-character', '°');
  await expect(degree).toHaveAttribute('data-alt-code-point', 'U+00B0');
  await expect(page.locator('[data-alt-code-card]:visible')).toHaveCount(1);

  await search.fill('0153');
  const trademark = page.locator('[data-alt-code-card][data-alt-code-digits="0153"]');
  await expect(trademark).toBeVisible();
  await expect(trademark).toHaveAttribute('data-alt-code-character', '™');
  await expect(trademark).toContainText('Alt + 0153');
  await expect(page.locator('[data-alt-code-card]:visible')).toHaveCount(1);

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


test('homepage tool grid stays single-column at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');

  const grid = page.locator('.home-tools-grid');
  await expect(grid).toBeVisible();

  const columns = await grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  expect(columns.trim().split(/\s+/)).toHaveLength(1);
});

test('critical pages fit a 320px viewport with primary navigation intact', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });

  for (const path of [
    '/',
    '/typing/',
    '/unicode/',
    '/tools/',
    '/tools/copy-paste-symbols/',
    '/tools/shortcut-finder/',
    '/tools/alt-code-finder/',
    '/tools/accent-keyboard/',
    '/tools/diacritics-keyboard/',
    '/tools/unicode-converter/',
    '/tools/invisible-characters/',
    '/guides/',
    '/guides/keyboard-shortcuts-for-symbols/',
    '/guides/alt-code-not-working/',
    '/letters/',
    '/letters/a-with-accents/',
    '/library/'
  ]) {
    await page.goto(path);

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(
      dimensions.scrollWidth,
      `${path} overflowed at 320px: scrollWidth=${dimensions.scrollWidth}, clientWidth=${dimensions.clientWidth}`
    ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    const primaryNav = page.locator('nav[aria-label="Primary navigation"]');
    for (const href of ['/symbols/', '/unicode/', '/tools/', '/guides/']) {
      await expect(primaryNav.locator(`a[href="${href}"]`)).toBeVisible();
    }
  }
});

test('representative pages remain overflow-free across common phone widths', async ({ page }) => {
  const paths = [
    '/',
    '/symbols/',
    '/symbols/degree-sign/',
    '/unicode/',
    '/tools/copy-paste-symbols/',
    '/letters/a-with-accents/',
    '/guides/keyboard-shortcuts-for-symbols/',
    '/guides/type-hashtag-number-sign/'
  ];

  for (const width of [360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });

    for (const path of paths) {
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      expect(
        dimensions.scrollWidth,
        `${path} overflowed at ${width}px: scrollWidth=${dimensions.scrollWidth}, clientWidth=${dimensions.clientWidth}`
      ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  }
});

test('mobile primary navigation and dense controls keep comfortable touch targets', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/tools/copy-paste-symbols/');

  const targets = [
    page.locator('nav[aria-label="Primary navigation"] a[href="/tools/"]'),
    page.locator('[data-category-link="popular"]'),
    page.locator('[data-catalog-copy]').first(),
    page.locator('[data-catalog-save]').first()
  ];

  for (const target of targets) {
    const box = await target.boundingBox();
    expect(box, 'Expected touch target to have a bounding box').not.toBeNull();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test('mobile form controls avoid focus zoom sizing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const [path, selector] of [
    ['/', '[data-character-search]'],
    ['/tools/unicode-converter/', '.converter-output-list textarea']
  ] as const) {
    await page.goto(path);
    const fontSize = await page.locator(selector).first().evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize)
    );
    expect(fontSize).toBeGreaterThanOrEqual(16);
  }
});


test('accent keyboard exposes broad A-Z coverage and filters characters', async ({ page }) => {
  await page.goto('/tools/accent-keyboard/');

  expect(await page.locator('[data-accent-key]').count()).toBeGreaterThanOrEqual(500);
  await expect(page.locator('[data-builder-base="a"]')).toBeVisible();
  await expect(page.locator('[data-builder-base="q"]')).toBeVisible();
  await expect(page.locator('[data-builder-base="z"]')).toBeVisible();

  await page.locator('[data-accent-language="Spanish"]').click();
  await expect(page.locator('[data-accent-key][data-character="ñ"]')).toBeVisible();
  await expect(page.locator('[data-accent-key][data-character="ą"]')).toBeHidden();

  await page.locator('[data-accent-language="all"]').click();
  await page.locator('[data-accent-letter="q"]').click();
  await expect(page.locator('[data-accent-key][data-character="ɋ"]')).toBeVisible();
  await page.locator('[data-accent-letter="all"]').click();

  const search = page.getByRole('searchbox', { name: 'Search accented characters' });
  const pad = page.getByRole('textbox', { name: 'Accent keyboard writing pad' });

  await page.locator('[data-accent-key][data-character="á"]').click();
  await expect(pad).toHaveValue('á');

  await page.locator('[data-accent-key][data-character="ñ"]').click();
  await expect(pad).toHaveValue('áñ');

  await search.fill('cedilla');
  await expect(page.locator('[data-accent-key]:visible').first()).toBeVisible();

  await page.locator('[data-accent-case="upper"]').click();
  await expect(page.locator('[data-accent-key][data-character="Ç"]')).toBeVisible();
  await expect(page.locator('[data-accent-key][data-character="ç"]')).toBeHidden();

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(pad).toHaveValue('');
});

test('A-Z accent directory links every base letter and renders code guidance', async ({ page }) => {
  await page.goto('/letters/');

  for (const letter of ['a', 'b', 'q', 'x', 'z']) {
    await expect(page.locator(`a[href="/letters/${letter}-with-accents/"]`)).toBeVisible();
  }

  await page.goto('/letters/q-with-accents/');
  await expect(page.getByRole('heading', { name: 'Q With Accents' })).toBeVisible();
  await expect(page.getByText('q with hook tail', { exact: true })).toBeVisible();
  await expect(page.getByText('U+024B', { exact: true })).toBeVisible();
  await expect(page.getByText(/024B then Alt \+ X/).first()).toBeVisible();
});

test('combining diacritics keyboard inserts marks and normalizes text', async ({ page }) => {
  await page.goto('/tools/diacritics-keyboard/');

  const pad = page.getByRole('textbox', { name: 'Combining diacritics writing pad' });
  await pad.fill('a');
  await page.getByRole('button', { name: 'Add acute, U+0301' }).click();
  await expect(pad).toHaveValue('a\u0301');
  await expect(page.locator('[data-diacritic-codepoints]')).toHaveText('U+0061 U+0301');

  await page.getByRole('button', { name: 'Normalize NFC' }).click();
  await expect(pad).toHaveValue('á');
  await expect(page.locator('[data-diacritic-codepoints]')).toHaveText('U+00E1');

  await page.getByRole('button', { name: 'Decompose NFD' }).click();
  await expect(pad).toHaveValue('a\u0301');
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

test('tools hub links to high-value character utilities', async ({ page }) => {
  await page.goto('/tools/');
  await expect(page.locator('a[href="/tools/copy-paste-symbols/"]')).toBeVisible();
  await expect(page.locator('a[href="/tools/accent-keyboard/"]')).toBeVisible();
  await expect(page.locator('a[href="/tools/diacritics-keyboard/"]')).toBeVisible();
  await expect(page.locator('a[href="/tools/unicode-converter/"]')).toBeVisible();
  await expect(page.locator('a[href="/tools/invisible-characters/"]')).toBeVisible();
  await expect(page.locator('a[href="/library/"]')).toBeVisible();
});

test('invisible character tool reveals reviewed hidden spacing', async ({ page }) => {
  await page.goto('/tools/invisible-characters/');

  await expect(page.locator('[data-invisible-copy]')).toHaveCount(8);
  await expect(page.getByRole('button', { name: 'Copy No-Break Space' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Copy Zero Width Space' })).toBeVisible();

  const input = page.getByRole('textbox', { name: 'Text to inspect' });
  await input.fill('A\u00A0B\u200BC');

  await expect(page.locator('[data-invisible-output]')).toContainText('A[NBSP]B[ZWSP]C');
  await expect(page.locator('[data-invisible-status]')).toContainText('2 recognized invisible characters');
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


test('long-form guides expose Article schema and reviewed sources', async ({ page }) => {
  for (const path of [
    '/guides/keyboard-shortcuts-for-symbols/',
    '/guides/type-special-characters-windows/',
    '/guides/type-special-characters-mac/',
    '/guides/special-characters-google-docs/',
    '/guides/type-accents-on-iphone/',
    '/guides/math-symbols-on-keyboard/',
    '/guides/type-hashtag-number-sign/',
    '/guides/quotation-marks-apostrophes/',
    '/guides/arrow-symbols-keyboard/',
    '/guides/alt-code-not-working/',
    '/guides/missing-symbol-square-box/'
  ]) {
    await page.goto(path);

    await expect(page.locator('.guide-section').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reviewed sources' })).toBeVisible();
    await expect(page.locator('.guide-sources a').first()).toHaveAttribute('href', /^https:\/\//);

    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const parsed = schemas.map((schema) => JSON.parse(schema));
    expect(parsed.some((schema) => schema['@type'] === 'Article')).toBeTruthy();
  }
});

test('guides hub links every reviewed guide with descriptive anchors', async ({ page }) => {
  await page.goto('/guides/');

  await expect(page.locator('.guide-card')).toHaveCount(16);
  await expect(page.getByRole('link', { name: /Keyboard Shortcuts for Symbols/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Special Characters on Windows/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Special Characters in Google Docs/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Hashtag or Number Sign/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Alt Code Not Working/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Square Box or Missing Glyph/ }).first()).toBeVisible();
});

test('accent builder offers valid reviewed combinations and inserts them', async ({ page }) => {
  await page.goto('/tools/accent-keyboard/');

  const pad = page.getByRole('textbox', { name: 'Accent keyboard writing pad' });
  await page.locator('[data-builder-base="a"]').click();
  await page.locator('[data-builder-accent="acute"]').click();

  const lower = page.locator('[data-builder-lower]');
  const upper = page.locator('[data-builder-upper]');

  await expect(lower).toHaveText('á');
  await expect(upper).toHaveText('Á');
  await lower.click();
  await upper.click();
  await expect(pad).toHaveValue('áÁ');
});

test('Alt Code Finder includes Microsoft documented punctuation codes', async ({ page }) => {
  await page.goto('/tools/alt-code-finder/');
  const search = page.getByRole('searchbox', { name: 'Symbol, name, Unicode code point or Alt-code digits' });

  await search.fill('dagger');
  await expect(page.locator('[data-alt-code-card]:visible')).toHaveCount(2);
  await expect(page.locator('[data-alt-code-card]:visible').first()).toContainText('Alt + 0134');

  await search.fill('section');
  await expect(page.locator('[data-alt-code-card]:visible')).toHaveCount(1);
  await expect(page.locator('[data-alt-code-card]:visible')).toContainText('Alt + 0167');
});


test('copy-paste catalog exposes broad visual symbol coverage', async ({ page }) => {
  await page.goto('/tools/copy-paste-symbols/');

  const cards = page.locator('[data-catalog-symbol]');
  expect(await cards.count()).toBeGreaterThanOrEqual(1300);
  await expect(page.locator('[data-catalog-category]')).toHaveCount(20);

  await expect(page.locator('[data-category-slug="arrows"]')).toBeVisible();
  await expect(page.locator('[data-category-slug="box-drawing"]')).toBeVisible();
  await expect(page.locator('[data-category-slug="greek"]')).toBeVisible();
  await expect(page.locator('[data-category-slug="superscripts"]')).toBeVisible();
  await expect(page.locator('[data-category-slug="enclosed"]')).toBeVisible();
  await expect(page.locator('[data-category-slug="misc-symbols"]')).toBeVisible();
  await expect(page.locator('[data-category-slug="dingbats"]')).toBeVisible();
});

test('copy-paste catalog searches names categories glyphs and code points', async ({ page }) => {
  await page.goto('/tools/copy-paste-symbols/');

  const search = page.getByRole('searchbox', { name: 'Search symbols' });

  await search.fill('fraction');
  expect(await page.locator('[data-catalog-symbol]:visible').count()).toBeGreaterThanOrEqual(15);
  await expect(page.locator('[data-category-slug="fractions"]')).toBeVisible();

  await search.fill('U+2192');
  const rightArrow = page.locator('[data-catalog-symbol][data-character="→"]:visible').first();
  await expect(rightArrow).toBeVisible();

  await search.fill('©');
  await expect(page.locator('[data-catalog-symbol][data-character="©"]:visible').first()).toBeVisible();
});

test('copy-paste catalog copy and favorite workflows use local character library', async ({ page }) => {
  await page.goto('/tools/copy-paste-symbols/');

  const card = page.locator('[data-catalog-symbol][data-character="∑"]').first();
  await card.locator('[data-catalog-save]').click();
  await expect(card.locator('[data-catalog-save]')).toHaveAttribute('aria-pressed', 'true');

  await card.locator('[data-catalog-copy]').click();
  await expect(card.locator('[data-catalog-copy-label]')).toHaveText('Copied');

  await page.goto('/library/');
  await expect(page.locator('[data-favorites-grid]').getByText('N-Ary Summation', { exact: true })).toBeVisible();
  await expect(page.locator('[data-recents-grid]').getByText('N-Ary Summation', { exact: true })).toBeVisible();
});

test('copy-paste catalog stays usable at narrow mobile widths', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/tools/copy-paste-symbols/');

  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  await expect(page.locator('[data-category-link="popular"]')).toBeVisible();
  await expect(page.locator('[data-category-link="arrows"]')).toBeVisible();
  await expect(page.locator('[data-catalog-symbol]').first()).toBeVisible();
});
