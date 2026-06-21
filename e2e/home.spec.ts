import { test, expect } from './fixtures';

test('home page renders featured products and primary nav', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Mulan/);

  // Featured products come from the (mocked) storefront.
  await expect(page.getByText('Top Marea').first()).toBeVisible();

  // Primary navigation links into the shop.
  await expect(page.getByRole('link', { name: 'Deportivo', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nosotras', exact: true })).toBeVisible();

  // Category counts are sourced live from Shopify collections: the deportivo
  // fixture has 2 products (Top Marea, Legging Bruma).
  await expect(page.getByText('2 piezas →').first()).toBeVisible();
});
