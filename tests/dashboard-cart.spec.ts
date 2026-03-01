import { test, expect } from '@playwright/test';

test('User can add product to cart from dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // ---- LOGIN FIRST ----
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');

  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  await page.waitForURL(/dashboard/);

  // ---- Wait for products ----
  await expect(page.getByTestId('product-card').first()).toBeVisible();

  // ---- Click ADD TO BAG on first product ----
  await page.getByTestId('dashboard-add-btn').first().click();

  // ---- Wait for modal ----
  await expect(page.getByText('Select Size')).toBeVisible();

  // ---- Select size L ----
  await page.getByTestId('size-L').click();

  // ---- Click modal ADD TO BAG ----
  await page.getByTestId('modal-add-to-cart').click();

  // ---- Wait for redirect to cart ----
  await page.waitForURL(/cart/);

  await expect(page).toHaveURL(/cart/);

  // ---- Confirm item appears in cart ----
  await expect(page.getByText('Grey Sarara')).toBeVisible();
});