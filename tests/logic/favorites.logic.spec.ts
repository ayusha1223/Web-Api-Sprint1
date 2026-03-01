import { test, expect } from '@playwright/test';

test('Add product to favorites', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Login
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  await page.waitForURL(/dashboard/);

  // Click heart on first product
  await page.getByTestId('favorite-toggle').first().click();

  // Go to favorites page
  await page.getByTestId('nav-favorites').click();
  await page.waitForURL(/favorites/);

  await expect(page.getByTestId('favorite-item')).toBeVisible();
});