const { test, expect } = require('@playwright/test');
const env = require('../../../src/config/env');
const { LoginPage } = require('../../../src/ui/pages/login.page');
const { InventoryPage } = require('../../../src/ui/pages/inventory.page');
const { CartPage } = require('../../../src/ui/pages/cart.page');

const productName = 'Sauce Labs Backpack';

test.describe('SauceDemo cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(env.ui.username, env.ui.password);
  });

  test('user can add and remove an item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.assertLoaded();

    await inventoryPage.addItemToCart(productName);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await cartPage.assertLoaded();
    await cartPage.assertItemVisible(productName);

    await page.locator('.cart_item').filter({ hasText: productName }).getByRole('button', { name: /remove/i }).click();
    await cartPage.assertItemNotVisible(productName);
  });
});
