import { test, expect } from '@playwright/test';

// ✅ ADD HELPER HERE (TOP OF FILE)
async function loginAndAddProduct(page: any) {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[name="email"]').fill('test@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: 'LOGIN', exact: true }).click();

  await page.waitForURL(/dashboard/);

  await page.getByTestId('dashboard-add-btn').first().click();
  await page.getByTestId('size-L').click();
  await page.getByTestId('modal-add-to-cart').click();

  // 🔥 Force go to cart
  await page.goto('http://localhost:3000/cart');

  await expect(page.getByTestId('cart-item')).toBeVisible();
}

test('Increase quantity', async ({ page }) => {
  await loginAndAddProduct(page);

  const quantity = page.getByTestId('cart-quantity');
  const initial = await quantity.textContent();

  await page.getByTestId('cart-increase').click();

  await expect(quantity).not.toHaveText(initial!);
});

test('Decrease quantity', async ({ page }) => {
  await loginAndAddProduct(page);

  await page.getByTestId('cart-increase').click();
  await page.getByTestId('cart-decrease').click();

  await expect(page.getByTestId('cart-quantity')).toHaveText('1');
});

test('Remove item', async ({ page }) => {
  await loginAndAddProduct(page);

  await page.getByTestId('cart-remove').click();

 await expect(
  page.getByTestId('cart-empty')
).toBeVisible();
});

test('Cart total updates', async ({ page }) => {
  await loginAndAddProduct(page);

  const total = page.getByTestId('cart-total');
  const initialTotal = await total.textContent();

  await page.getByTestId('cart-increase').click();

  await expect(total).not.toHaveText(initialTotal!);
});

test('Cart empty state', async ({ page }) => {
  await page.goto('http://localhost:3000/cart');

 await expect(
  page.getByTestId('cart-empty')
).toBeVisible();
});