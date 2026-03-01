import { test, expect } from '@playwright/test';

/* ================= GLOBAL ADMIN SETUP ================= */

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.evaluate(() => {
    localStorage.setItem('token', 'fake-admin-token');
    localStorage.setItem('user', JSON.stringify({
      id: '1',
      email: 'admin@test.com',
      role: 'admin'
    }));
  });
});

/* ================= DASHBOARD ================= */

test('Admin dashboard loads successfully', async ({ page }) => {

  await page.route('**/api/admin/dashboard', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          totalUsers: 10,
          totalOrders: 5,
          totalRevenue: 5000,
          pendingPayments: 1,
          revenueByMonth: [],
          ordersThisWeek: []
        }
      })
    })
  );

  await page.goto('http://localhost:3000/admin');

  await expect(page.getByText('Dashboard Overview')).toBeVisible();
  await expect(page.getByText('Total Users')).toBeVisible();
});

/* ================= ADD PRODUCT ================= */

test('Admin can add product', async ({ page }) => {

  await page.route('**/api/products', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] })
    })
  );

  await page.goto('http://localhost:3000/admin/products');

  await page.getByRole('button', { name: 'Add Product' }).click();
  await expect(page).toHaveURL(/create/);

  await page.getByTestId('product-name').fill('Test Kurtha');
  await page.getByTestId('product-description').fill('Test description');
  await page.getByTestId('product-price').fill('2000');
  await page.getByTestId('product-stock').fill('10');

  await page.selectOption('select', 'casual');

  // FIXED: strict mode safe selector
  await page.getByRole('button', { name: 'M' }).click();

  await page.getByRole('button', { name: 'Create Product' }).click();

  await expect(page).toHaveURL(/admin\/products/);
});

/* ================= EDIT PRODUCT ================= */

test('Admin can edit product', async ({ page }) => {

  await page.route('**/api/products', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [{
          _id: "123",
          name: "Sample Product",
          price: 1000,
          category: "casual",
          stock: 5,
          images: []
        }]
      })
    })
  );

  await page.goto('http://localhost:3000/admin/products');

  await expect(page.getByText('Sample Product')).toBeVisible();

  // Stable Lucide selector
  await page.locator('svg.lucide-pencil').first().click();

  await expect(page).toHaveURL(/edit/);
});

/* ================= DELETE PRODUCT ================= */

test('Admin can delete product', async ({ page }) => {

  await page.route('**/api/products', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [{
          _id: "123",
          name: "Sample Product",
          price: 1000,
          category: "casual",
          stock: 5,
          images: []
        }]
      })
    })
  );

  await page.route('**/api/products/123', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: "Product deleted successfully" })
    })
  );

  await page.goto('http://localhost:3000/admin/products');

  await expect(page.getByText('Sample Product')).toBeVisible();

  await page.locator('svg.lucide-trash-2').first().click();

  // FIXED: strict-mode safe
  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(page.getByText('Product deleted successfully')).toBeVisible();
});