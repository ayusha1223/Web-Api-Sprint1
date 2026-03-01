import { test, expect } from '@playwright/test';

test('User can request password reset', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: 'Forgot Password', exact: true }).click();

  await expect(
    page.getByRole('heading', { name: 'Forgot Password', exact: true })
  ).toBeVisible();

  await page.locator('input[name="email"]').fill('test@gmail.com');

  // Handle alert
  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await page.getByRole('button', { name: /send/i }).click();

  // Click Back to Login manually
  await page.getByRole('button', { name: 'Back to Login', exact: true }).click();

  // Now expect login heading
  await expect(
    page.getByRole('heading', { name: 'Login', exact: true })
  ).toBeVisible();
});