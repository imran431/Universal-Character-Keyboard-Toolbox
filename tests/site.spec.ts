import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const indexablePaths = ['/', '/symbols/', '/symbols/degree-sign/'];

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

test('starter search filters popular characters', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Search characters' }).fill('degree');
  await expect(page.getByText('Degree Sign', { exact: true })).toBeVisible();
  await expect(page.locator('[data-symbol-card]:visible')).toHaveCount(1);
});


test('starter search understands characters, code points, and aliases', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox', { name: 'Search characters' });

  await search.fill('°');
  await expect(page.getByText('Degree Sign', { exact: true })).toBeVisible();
  await expect(page.locator('[data-symbol-card]:visible')).toHaveCount(1);

  await search.fill('U+00B0');
  await expect(page.getByText('Degree Sign', { exact: true })).toBeVisible();
  await expect(page.locator('[data-symbol-card]:visible')).toHaveCount(1);

  await search.fill('&#176;');
  await expect(page.getByText('Degree Sign', { exact: true })).toBeVisible();
  await expect(page.locator('[data-symbol-card]:visible')).toHaveCount(1);

  await search.fill('tick');
  await expect(page.getByText('Check Mark', { exact: true })).toBeVisible();
});
