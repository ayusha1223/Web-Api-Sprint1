import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/?auth=login');

  await page.fill('input[type="email"]', 'test@test.com');
  await page.fill('input[type="password"]', '123456');

  await Promise.all([
    page.waitForURL('**/dashboard'),
    page.click('button[type="submit"]'),
  ]);

  await page.context().storageState({ path: 'storageState.json' });
});