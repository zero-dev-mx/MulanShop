import { test, expect } from './fixtures';

test('add a product to the bag, then remove it', async ({ page }) => {
  await page.goto('/producto/top-marea');

  // A size must be chosen before the item can be added.
  await page.getByRole('button', { name: 'CH', exact: true }).click();
  await page.getByRole('button', { name: /Agregar a la bolsa/ }).click();

  // The cart drawer opens with the added line.
  const drawer = page.getByRole('complementary');
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText('1 pieza', { exact: true })).toBeVisible();
  await expect(drawer.getByText('Top Marea')).toBeVisible();
  await expect(drawer.getByRole('button', { name: /Ir a pagar/ })).toBeVisible();

  // Removing the line empties the bag.
  await drawer.getByRole('button', { name: 'Quitar' }).click();
  await expect(drawer.getByText(/Tu bolsa está vacía/)).toBeVisible();
});

test('empty bag shows the empty state from the header', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /Bolsa/ }).first().click();

  const drawer = page.getByRole('complementary');
  await expect(drawer.getByText(/Tu bolsa está vacía/)).toBeVisible();
});
