const { test, expect } = require('@playwright/test');
const env = require('../../../src/config/env');
const { LoginPage } = require('../../../src/ui/pages/login.page');
const { InventoryPage } = require('../../../src/ui/pages/inventory.page');
const { CartPage } = require('../../../src/ui/pages/cart.page');
const { CheckoutPage } = require('../../../src/ui/pages/checkout.page');

const productName = 'Sauce Labs Bike Light';

test.describe('SauceDemo checkout', () => {
  test('user can complete checkout for a single product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(env.ui.username, env.ui.password);

    await inventoryPage.addItemToCart(productName);
    await inventoryPage.openCart();

    await cartPage.assertItemVisible(productName);
    await cartPage.checkout();

    await checkoutPage.fillCustomerData({
      firstName: 'Test',
      lastName: 'User',
      postalCode: '15-367'
    });

    await checkoutPage.assertOverviewLoaded();
    await checkoutPage.assertTotalVisible();
    await checkoutPage.finishOrder();
    await checkoutPage.assertOrderCompleted();
  });

  test('user can logout from inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(env.ui.username, env.ui.password);
    await inventoryPage.assertLoaded();

    await inventoryPage.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
