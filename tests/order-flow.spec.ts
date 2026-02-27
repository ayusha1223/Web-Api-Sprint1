import { test, expect } from '@playwright/test';

test('full order flow - COD', async ({ page }) => {

  // LOGIN
  await page.goto('http://localhost:3000/?auth=login');

  await page.fill('input[type="email"]', 'test@test.com');
  await page.fill('input[type="password"]', '123456');

  await Promise.all([
    page.waitForURL('**/dashboard'),
    page.click('button[type="submit"]'),
  ]);

  // GO TO PRODUCT
  await page.goto('/product/featured-kurti-2');
  await page.getByRole('button', { name: /add to cart/i }).click();

  // GO TO CART
  await page.goto('/cart');

  // OPEN DELIVERY MODAL
  await page.getByRole('button', { name: /proceed to checkout/i }).click();

  // WAIT FOR DELIVERY MODAL
  await expect(page.getByText('Delivery Details')).toBeVisible();

  // FILL DELIVERY FORM
  await page.getByPlaceholder('Full Name').fill('Test User');
  await page.getByPlaceholder('Phone Number').fill('9876543210');
  await page.getByPlaceholder('Email Address').fill('test@test.com');
  await page.getByPlaceholder('Full Address').fill('Kathmandu Nepal');
  await page.getByPlaceholder('City').fill('Kathmandu');

  // CONTINUE TO PAYMENT
  await page.getByRole('button', { name: /continue/i }).click();

  // WAIT FOR PAYMENT MODAL
  await expect(page.getByText('Choose Payment Method')).toBeVisible();

  // CLICK COD
  await page.getByRole('button', { name: /cash on delivery/i }).click();

  // WAIT FOR CONFIRMATION MODAL
  await expect(page.getByText('Confirm Your Order')).toBeVisible();

  // CONFIRM COD
  await page.getByRole('button', { name: /yes, confirm/i }).click();

  // WAIT FOR PAYMENT PAGE
  await page.waitForURL('**/payment**');

  // WAIT FOR SUCCESS REDIRECT (because of 1.5s timeout)
  await page.waitForURL('**/order-success**', { timeout: 15000 });

  await expect(page).toHaveURL(/order-success/);

  // OPTIONAL: Verify Track Order button exists
  await expect(page.getByText(/track order/i)).toBeVisible();

});