const { expect } = require("@playwright/test");

export class Popup {
  constructor(page) {
    this.page = page;
  }

  async haveText(message) {
    const element = this.page.locator(".swal2-html-container");
    await expect(element).toHaveText(message);
    await this.page.keyboard.press("Escape");
  }

  async refresh() {
    await this.page.reload();
  }
}
