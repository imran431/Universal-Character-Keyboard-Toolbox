import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/', '/symbols/', '/symbols/degree-sign/']) {
  test(`${path} has essential SEO metadata`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('title')).not.toHaveText('');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^http:\/\/localhost:4321\//);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index,follow/);
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

test('starter search filters popular characters', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Search characters' }).fill('degree');
  await expect(page.getByText('Degree Sign', { exact: true })).toBeVisible();
  await expect(page.locator('[data-symbol-card]:visible')).toHaveCount(1);
});
