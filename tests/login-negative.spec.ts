import { test, expect } from '@playwright/test';

test('Login fails with wrong password', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('wrongpassword');

  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  // Wait a moment for request to complete
  await page.waitForTimeout(1000);

  // Should NOT redirect to dashboard
  await expect(page).not.toHaveURL(/dashboard/);
});