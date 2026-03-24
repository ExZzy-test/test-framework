const { test, expect } = require('@playwright/test');
const env = require('../../../src/config/env');
const { LoginPage } = require('../../../src/ui/pages/login.page');
const { InventoryPage } = require('../../../src/ui/pages/inventory.page');

test.describe('SauceDemo login', () => {
  test('successful login with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(env.ui.username, env.ui.password);

    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertLoaded();
  });

  test('locked out user sees correct error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('locked_out_user', env.ui.password);

    await loginPage.assertLoginError('Sorry, this user has been locked out.');
  });

  test('invalid user credentials show validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('invalid_user', 'invalid_password');

    await loginPage.assertLoginError('Username and password do not match');
  });
});
