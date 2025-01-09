const { test } = require("../support");

test.beforeEach(async ({ page }) => {
    await page.login.visit();
});

test.describe("Login", () => {
    test("deve logar como administrador", async ({ page }) => {
        await page.login.submit("admin@zombieplus.com", "pwd123");
        await page.login.isLoggedIn();
    });

    test("não deve logar com email incorreto", async ({ page }) => {
        await page.login.submit("www.felipe.com", "pwd1234");
        await page.login.alertHaveText("Email incorreto");
    });

    test("não deve logar com senha incorreta", async ({ page }) => {
        await page.login.submit("admin@zombieplus.com", "pwd1234");
        const message =
            "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
        await page.toast.containsText(message);
    });

    test("não deve logar quando o email não é preenchido", async ({ page }) => {
        await page.login.submit("", "pwd123");
        await page.login.alertHaveText("Campo obrigatório");
    });

    test("não deve logar quando a senha não é preenchida", async ({ page }) => {
        await page.login.submit("admin@zombieplus.com", "");
        await page.login.alertHaveText("Campo obrigatório");
    });

    test("não deve logar quando nenhum campo é preenchido", async ({ page }) => {
        await page.login.submit("", "");
        await page.login.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
    });
});
