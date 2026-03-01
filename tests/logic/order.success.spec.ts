import { test, expect } from '@playwright/test';

async function placeCodOrder(page: any) {
  await page.goto('http://localhost:3000');

  // Login
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  await page.waitForURL(/dashboard/);

  // Add product
  await page.getByTestId('dashboard-add-btn').first().click();
  await page.getByTestId('size-L').click();
  await page.getByTestId('modal-add-to-cart').click();

  await page.goto('http://localhost:3000/cart');

  await page.getByTestId('checkout-btn').click();

  // Fill delivery
  await page.getByTestId('delivery-fullname').fill('Test User');
  await page.getByTestId('delivery-phone').fill('9800000000');
  await page.getByTestId('delivery-email').fill('test@gmail.com');
  await page.getByTestId('delivery-address').fill('Kathmandu Nepal Address');
  await page.getByTestId('delivery-city').fill('Kathmandu');

  await page.getByTestId('delivery-continue').click();

  // Select COD
  await page.getByTestId('payment-cod').click();
  await page.getByTestId('confirm-cod').click();

  await page.waitForURL(/payment/);
}

test('Order success page displays correct data', async ({ page }) => {
  await placeCodOrder(page);

  // Order ID exists
  const orderId = await page.getByTestId('order-id').textContent();
  expect(orderId).toBeTruthy();

  // Status
  await expect(page.getByTestId('order-status')).toHaveText(/processing|order placed/i);

  // Total exists
  await expect(page.getByTestId('order-total')).toBeVisible();

  // Receipt page loads
  await page.getByTestId('order-receipt').click();
  await page.waitForURL(/receipt/);
  await expect(page).toHaveURL(/receipt/);

  // Go back
  await page.goBack();

  // Track page loads
  await page.getByTestId('order-track').click();
  await page.waitForURL(/track-order/);
  await expect(page).toHaveURL(/track-order/);
});