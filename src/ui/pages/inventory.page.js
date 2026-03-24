const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  addToCartButtonByName(name) {
    return this.page.locator('.inventory_item').filter({ hasText: name }).getByRole('button', { name: /add to cart/i });
  }

  removeButtonByName(name) {
    return this.page.locator('.inventory_item').filter({ hasText: name }).getByRole('button', { name: /remove/i });
  }

  async assertLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addItemToCart(name) {
    await this.addToCartButtonByName(name).click();
  }

  async removeItemFromCart(name) {
    await this.removeButtonByName(name).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
