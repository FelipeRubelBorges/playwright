const { test } = require("../support");

test.beforeEach(async ({ page }) => {
    await page.login.visit();
    await page.login.submit("admin@zombieplus.com", "pwd123");
});

test.describe("Movies", () => {

    test('deve cadastrar um novo filme', async ({ page }) => {
        const movie = page.data.create;
        await page.executeSql(`DELETE FROM movies WHERE title = '${movie.title}';`);
        await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);
        await page.toast.containsText("Cadastro realizado com sucesso!");
    });
});
