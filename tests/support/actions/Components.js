const { expect } = require("@playwright/test");

export class Toast {
  constructor(page) {
    this.page = page;
  }

  async containsText(message) {
    const toast = this.page.locator(".toast").first();
    await expect(toast).toContainText(message);
    await expect(toast).toBeHidden({ timeout: 6000 });
  }

}
