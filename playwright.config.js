const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 3,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  expect: {
    timeout: 5_000
  },
  use: {
    headless: true,
    actionTimeout: 10_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 900 }
  },
  projects: [
    {
      name: 'ui-tests',
      testMatch: /tests\/ui\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com'
      }
    },
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.js/,
      use: {
        baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
          Accept: 'application/json'
        }
      }
    }
  ]
});
