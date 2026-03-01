import { test, expect } from '@playwright/test';

test('Main navbar links work', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.click('text=About');
  await expect(page).toHaveURL(/about/);

  await page.click('text=Contact');
  await expect(page).toHaveURL(/contact/);

  await page.click('text=Sale');
  await expect(page).toHaveURL(/sale/);

  await page.click('text=Home');
  await expect(page).toHaveURL('/');
});