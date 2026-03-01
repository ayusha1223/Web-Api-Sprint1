import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', 'fake-admin-token');
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: '1',
        email: 'admin@test.com',
        role: 'admin',
        name: 'Admin'
      })
    );
  });
});

/* ================= CATEGORY NAVIGATION ================= */

test('Category navigation works', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByRole('link', { name: 'CASUAL' }).click();
  await expect(page).toHaveURL(/category\/casual/);

  await page.getByRole('link', { name: 'WINTER' }).click();
  await expect(page).toHaveURL(/category\/winter/);

  await page.getByRole('link', { name: 'WEDDING' }).click();
  await expect(page).toHaveURL(/category\/wedding/);
});

/* ================= SEARCH ================= */

test('Search updates URL', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/dashboard');

  const searchInput = page.getByPlaceholder('Search...');

  await expect(searchInput).toBeVisible();

  await searchInput.fill('kurtha');

  await expect(page).toHaveURL(/dashboard\?search=kurtha/);
});

/* ================= WISHLIST & CART ================= */

test('Wishlist navigation works', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByTestId('nav-favorites').click();
  await expect(page).toHaveURL(/favorites/);
});

test('Cart navigation works', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByTestId('nav-cart').click();
  await expect(page).toHaveURL(/cart/);
});

/* ================= PROFILE DROPDOWN ================= */

test('Profile dropdown opens', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByText('Profile').click();

  await expect(page.getByText('Edit Profile')).toBeVisible();
  await expect(page.getByText('My Orders')).toBeVisible();
});

/* ================= LOGOUT ================= */

test('Logout works correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByText('Profile').click();
  await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/auth=login/);
});

/* ================= NOTIFICATIONS ================= */

test('Notifications dropdown opens', async ({ page }) => {

  await page.route('**/api/notifications', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          {
            _id: "1",
            message: "Order shipped",
            isRead: false,
            createdAt: new Date().toISOString()
          }
        ]
      })
    })
  );

  await page.goto('http://localhost:3000/dashboard');

  await page.getByText('Alerts').click();

  await expect(page.getByText('Notifications')).toBeVisible();
  await expect(page.getByText('Order shipped')).toBeVisible();
});

/* ================= TRY ON MODAL ================= */

test('Try On modal opens and closes', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByText('Try On').click();

  await expect(page.locator('.fixed.inset-0')).toBeVisible();

  await page.getByText('✕').click();

  await expect(page.locator('.fixed.inset-0')).not.toBeVisible();
});

/* ================= THEME TOGGLE ================= */

test('Theme toggle works', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await page.getByText('Profile').click();

  await page.getByRole('button', { name: /Dark Mode|Light Mode/ }).click();
});