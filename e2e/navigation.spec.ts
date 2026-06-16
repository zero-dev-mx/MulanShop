import { test, expect } from '@playwright/test';

test('category nav filters the shop to deportivo', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Deportivo' }).click();

  await expect(page).toHaveURL(/\/tienda\?cat=deportivo/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('moverse');

  // Deportivo products are shown, products from other collections are not.
  await expect(page.getByText('Top Marea').first()).toBeVisible();
  await expect(page.getByText('Legging Bruma').first()).toBeVisible();
  await expect(page.getByText('Short Arena')).toHaveCount(0);
});

test('product card links to the product detail page', async ({ page }) => {
  await page.goto('/tienda');

  await page.getByRole('link', { name: /Top Marea/ }).first().click();

  await expect(page).toHaveURL(/\/producto\/top-marea/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Top Marea');
});
