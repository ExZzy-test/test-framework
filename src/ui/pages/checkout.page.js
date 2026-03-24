const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async fillCustomerData({ firstName, lastName, postalCode }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async assertOverviewLoaded() {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
  }

  async assertTotalVisible() {
    await expect(this.totalLabel).toBeVisible();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async assertOrderCompleted() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

module.exports = { CheckoutPage };
