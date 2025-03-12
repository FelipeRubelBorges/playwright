const { expect } = require("@playwright/test");

export class Movies {
  constructor(page) {
    this.page = page;
  }

  async goForm() {
    await this.page.locator("a[href$='register']").click();
  }

  async submit() {
    await this.page.getByRole("button", { name: "Cadastrar" }).click();
  }

  async create(movie) {
    await this.goForm();
    await this.page.locator("#title").fill(movie.title);
    await this.page.locator("#overview").fill(movie.overview);
    await this.page.waitForSelector(
      "#select_company_id .react-select__indicator",
      { state: "visible" }
    );
    await this.page
      .locator("#select_company_id .react-select__indicator")
      .first()
      .click();
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: movie.company })
      .click();
    await this.page.locator("#select_year .react-select__indicator").click();
    await this.page
      .locator(".react-select__option")
      .filter({ hasText: movie.release_year })
      .click();
    await this.page
      .getByLabel("poster")
      .setInputFiles("tests/support/fixtures" + movie.cover);
    if (movie.featured === true) {
      await this.page.locator(".featured .react-switch").click();
    }
    await this.submit();
  }

  async alertHaveText(target) {
    const alerts = this.page.locator(".alert");
    const count = await alerts.count();

    for (let i = 0; i < count; i++) {
      await expect(alerts.nth(i)).toHaveText(target);
    }
  }

  async remove(movie) {
    await this.page.reload();
    await this.page
      .getByRole("row", { name: movie.title })
      .getByRole("button")
      .click();
    await this.page.click(".confirm-removal");
  }

  async search(term, outputs) {
    await this.page.reload();
    await this.page.getByPlaceholder("Busque pelo nome").fill(term);
    await this.page.click(".actions button");
    const rows = this.page.getByRole("row");
    await expect(rows).toContainText(outputs);
  }
}
