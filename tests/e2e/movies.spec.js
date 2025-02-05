const { test } = require("../support");

test.beforeEach(async ({ page }) => {
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
});

test.describe("Movies", () => {

    test('deve cadastrar um novo filme como featured', async ({ page }) => {
        const movie = page.data.world_war_z;
        await page.executeSql(`DELETE FROM movies WHERE title = '${movie.title}';`);
        await page.movies.create(movie);
        await page.toast.containsText("Cadastro realizado com sucesso!");
    });

    test('deve cadastrar um novo filme como não featured', async ({ page }) => {
        const movie = page.data.dawn_of_the_dead;
        await page.executeSql(`DELETE FROM movies WHERE title = '${movie.title}';`);
        await page.movies.create(movie);
        await page.toast.containsText("Cadastro realizado com sucesso!");
    });

    test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
        await page.movies.goForm();
        await page.movies.submit();
        await page.movies.alertHaveText([
            "Por favor, informe o título.",
            "Por favor, informe a sinopse.",
            "Por favor, informe a empresa distribuidora.",
            "Por favor, informe o ano de lançamento."
        ]);
    });
});
