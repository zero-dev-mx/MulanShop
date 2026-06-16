import { test, expect } from '@playwright/test';

test('home page renders featured products and primary nav', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Mulán/);

  // Featured products come from the (mocked) storefront.
  await expect(page.getByText('Top Marea').first()).toBeVisible();

  // Primary navigation links into the shop.
  await expect(page.getByRole('link', { name: 'Deportivo' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nosotras' })).toBeVisible();
});
