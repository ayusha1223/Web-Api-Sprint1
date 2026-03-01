import { test, expect } from '@playwright/test';

test('Complete COD order flow', async ({ page }) => {

  // Go to dashboard
  await page.goto('/dashboard');

  // Wait for products
  await page.waitForSelector('[data-testid="product-card"]');

  const firstProduct = page.getByTestId('product-card').first();

  // Click dashboard ADD TO BAG button
  await firstProduct.getByTestId('dashboard-add-btn').click();

  // Wait for size modal
  await page.waitForSelector('[data-testid="size-M"]');

  // Select size
  await page.getByTestId('size-M').click();

  // Add to cart from modal
  await page.getByTestId('modal-add-to-cart').click();

  // It auto redirects to cart after timeout
  await expect(page).toHaveURL(/cart/);

  // Proceed to checkout
  await page.getByTestId('checkout-btn').click();

  // Fill delivery form
  await page.getByTestId('delivery-fullname').fill('Test User');
  await page.getByTestId('delivery-phone').fill('9800000000');
  await page.getByTestId('delivery-email').fill('test@test.com');
  await page.getByTestId('delivery-address').fill('Kathmandu Nepal');
  await page.getByTestId('delivery-city').fill('Kathmandu');

  await page.getByTestId('delivery-continue').click();

  // Mock login token before payment
  await page.evaluate(() => {
    localStorage.setItem("token", "fake-test-token");
  });

  // Select COD
  await page.getByTestId('payment-cod').click();

  // Confirm COD
  await page.getByTestId('confirm-cod').click();

  // Expect payment page
  await expect(page).toHaveURL(/payment/);
});