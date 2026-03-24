const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  cartItemByName(name) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async assertLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async assertItemVisible(name) {
    await expect(this.cartItemByName(name)).toBeVisible();
  }

  async assertItemNotVisible(name) {
    await expect(this.cartItemByName(name)).toHaveCount(0);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
