const { test } = require("../support");

test.beforeEach(async ({ page }) => {
    await page.login.do("admin@zombieplus.com", "pwd123");
});

test.describe("Movies", () => {

    test('deve cadastrar um novo filme', async ({ page }) => {
        const movie = page.data.create;
        await page.executeSql(`DELETE FROM movies WHERE title = '${movie.title}';`);
        await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);
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
