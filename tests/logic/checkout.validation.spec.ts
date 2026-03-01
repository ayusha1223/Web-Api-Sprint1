import { test, expect } from '@playwright/test';

async function openDeliveryModal(page: any) {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  await page.waitForURL(/dashboard/);

  await page.getByTestId('dashboard-add-btn').first().click();
  await page.getByTestId('size-L').click();
  await page.getByTestId('modal-add-to-cart').click();

  await page.goto('http://localhost:3000/cart');

  await page.getByTestId('checkout-btn').click();
}

test('Empty address shows error', async ({ page }) => {
  await openDeliveryModal(page);

  await page.getByTestId('delivery-fullname').fill('Test User');
  await page.getByTestId('delivery-phone').fill('9800000000');
  await page.getByTestId('delivery-email').fill('test@gmail.com');
  await page.getByTestId('delivery-city').fill('Kathmandu');

  // Leave address empty

  await page.getByTestId('delivery-continue').click();

  await expect(
    page.getByText(/address is required/i)
  ).toBeVisible();
});