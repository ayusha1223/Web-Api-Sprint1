import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,

  reporter: [
    ['list'], // shows in terminal
    ['html', { open: 'never' }] // generates HTML report
  ],

  use: {
    baseURL: 'http://localhost:3000',
    headless: false,

    viewport: { width: 1440, height: 900 }, // desktop layout

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
});