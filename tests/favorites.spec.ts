import { test, expect } from '@playwright/test';

test('Manual check: dashboard to favorites', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Login
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  await page.waitForURL(/dashboard/);

  // 🔥 Pause here
  await page.pause();

  // After you manually click heart icon,
  // test will continue and verify
  await page.waitForURL(/favorites/);
  await expect(page).toHaveURL(/favorites/);
});