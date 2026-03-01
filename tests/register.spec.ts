import { test, expect } from '@playwright/test';

test('User can register successfully', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Open modal
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Switch to register (inside modal)
  await page.getByRole('button', { name: 'Sign Up', exact: true }).click();

  // Wait for Create Account heading
  await expect(
    page.getByRole('heading', { name: 'Create Account', exact: true })
  ).toBeVisible();

  // Fill form using name attributes
  await page.locator('input[name="name"]').fill('Test User');
  await page.locator('input[name="email"]').fill('newuser@test.com');
  await page.locator('input[name="phone"]').fill('9800000000');
  await page.locator('input[name="password"]').fill('123456');
  await page.locator('input[name="confirmPassword"]').fill('123456');

  // Submit
  await page.getByRole('button', { name: 'Create Account', exact: true }).click();

  // Should switch back to Login
  await expect(
    page.getByRole('heading', { name: 'Login', exact: true })
  ).toBeVisible();
});