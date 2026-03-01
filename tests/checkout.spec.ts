import { test, expect } from '@playwright/test';

test('Full flow: dashboard → cart → delivery → payment', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // ---------------- LOGIN ----------------
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  await page.waitForURL(/dashboard/);

  // ---------------- ADD PRODUCT ----------------
  await expect(page.getByTestId('product-card').first()).toBeVisible();

  await page.getByTestId('dashboard-add-btn').first().click();

  await expect(page.getByText('Select Size')).toBeVisible();

  await page.getByTestId('size-L').click();
  await page.getByTestId('modal-add-to-cart').click();

  // Wait if you use setTimeout push
  await page.waitForTimeout(1600);

  await page.waitForURL(/cart/);

  // ---------------- CHECKOUT ----------------
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();

  // ---------------- DELIVERY STEP ----------------
  await expect(
  page.getByRole('heading', { name: 'Delivery Details' })
).toBeVisible();

 await page.getByPlaceholder('Full Name').fill('Test User');
await page.getByPlaceholder('Phone Number').fill('9800000000');
await page.getByPlaceholder('Email Address').fill('test@gmail.com');
await page.getByPlaceholder('Full Address')
  .fill('Kathmandu, Bagmati Province, Nepal 44600');
await page.getByPlaceholder('City').fill('Kathmandu');

  await page.getByRole('button', { name: 'Continue' }).click();

  // ---------------- PAYMENT STEP ----------------
// ---------------- PAYMENT STEP ----------------
await expect(
  page.getByRole('heading', { name: 'Choose Payment Method' })
).toBeVisible();

// Click Cash on Delivery (ONLY ONCE)
await page.getByTestId('payment-cod').click();

// ---------------- CONFIRM MODAL ----------------
await expect(
  page.getByRole('heading', { name: 'Confirm Your Order' })
).toBeVisible();

// Click confirm
await page.getByTestId('confirm-cod').click();

// Wait redirect
await page.waitForURL(/order-success/);

// Verify success page
// ---------------- SUCCESS PAGE ----------------
await expect(
  page.getByRole('heading', { name: 'Order Confirmed' })
).toBeVisible();


// ================= VIEW RECEIPT FIRST =================
await page.getByRole('button', { name: 'View / Download Receipt' }).click();
await page.waitForURL(/receipt/);
await expect(page).toHaveURL(/receipt/);

// Go back to success page
await page.goBack();
await expect(
  page.getByRole('heading', { name: 'Order Confirmed' })
).toBeVisible();


// ================= TRACK ORDER =================
await page.getByRole('button', { name: 'Track Order' }).click();
await page.waitForURL(/track-order/);
await expect(
  page.getByRole('heading', { name: 'Track Your Order' })
).toBeVisible();


// ================= CONTINUE SHOPPING FROM TRACK =================
await page.getByRole('button', { name: 'Continue Shopping' }).click();
await page.waitForURL(/dashboard/);
await expect(page).toHaveURL(/dashboard/);
});