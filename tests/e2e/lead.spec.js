const { test, expect } = require("../support");

let leadName;
let leadEmail;

test.beforeEach(async ({ page }) => {
  await page.landing.visit();
  await page.landing.openLeadModal();
});

test.describe("Lead Form", () => {
  test("deve cadastrar um lead na fila de espera", async ({ page }) => {
    leadName = page.faker.person.fullName();
    leadEmail = page.faker.internet.email();

    await page.landing.submitLeadForm(leadName, leadEmail);
    const message =
      "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
    await page.toast.containsText(message);
  });

  test("não deve cadastrar quando o email já está cadastrado", async ({ request, page }) => {
    leadName = page.faker.person.fullName();
    leadEmail = page.faker.internet.email();
    const response = await request.post("http://localhost:3333/leads", {
      data: {
        name: leadName,
        email: leadEmail,
      },
    });
    expect(response.ok());

    await page.landing.submitLeadForm(leadName, leadEmail);
    const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
    await page.toast.containsText(message);
  });

  test("não deve cadastrar com email incorreto", async ({ page }) => {
    await page.landing.submitLeadForm("Felipe Rubel Borges", "borges.com");
    await page.landing.alertHaveText("Email incorreto");
  });

  test("não deve cadastrar quando um nome não é preenchido", async ({ page }) => {
    await page.landing.submitLeadForm("", "felipe.borges@gmail.com");
    await page.landing.alertHaveText("Campo obrigatório");
  });

  test("não deve cadastrar quando um email não é preenchido", async ({ page }) => {
    await page.landing.submitLeadForm("Felipe Borges", "");
    await page.landing.alertHaveText("Campo obrigatório");
  });

  test("não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {
    await page.landing.submitLeadForm("", "");
    await page.landing.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
  });
});

