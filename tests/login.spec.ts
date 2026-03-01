import { test, expect } from '@playwright/test';

test('User can login successfully', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Open auth modal (navbar button is "Sign In")
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for Login heading (ONLY the h2)
  await expect(
    page.getByRole('heading', { name: 'Login', exact: true })
  ).toBeVisible();

  // Fill using name attributes (stable selectors)
  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');

  // Click LOGIN button (uppercase)
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  // Wait for redirect
  await page.waitForURL(/dashboard/);

  await expect(page).toHaveURL(/dashboard/);
});