const { expect } = require("@playwright/test");

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000/admin/login");
    const loginForm = this.page.locator(".login-form");
    await expect(loginForm).toBeVisible();
  }

  async submit(email, password) {
    await this.page.getByPlaceholder("E-mail").fill(email);
    await this.page.getByPlaceholder("Senha").fill(password);
    await this.page.getByText("Entrar").click();
  }

  async toastHaveText(message) {
    const toast = this.page.locator(".toast");
    await expect(toast).toHaveText(message);
    await expect(toast).toBeHidden({ timeout: 5000 });
  }

  async alertHaveText(target) {
    const alert = this.page.locator("span[class$=alert]");
    await expect(alert).toHaveText(target);
  }
}
