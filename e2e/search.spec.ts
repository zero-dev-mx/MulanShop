import { test, expect } from '@playwright/test';

test('header search routes to results for a query', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByPlaceholder('Buscar productos...').fill('top');
  await page.getByRole('button', { name: 'Ir →' }).click();

  await expect(page).toHaveURL(/\/buscar\?q=top/);
  await expect(page.getByText('1 resultado')).toBeVisible();
  await expect(page.getByText('Top Marea').first()).toBeVisible();
});

test('a query with no matches shows the empty state', async ({ page }) => {
  await page.goto('/buscar?q=zzzzz');

  await expect(page.getByText(/Sin resultados/)).toBeVisible();
});
