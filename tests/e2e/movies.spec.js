const { test} = require("../support");
const { executeSql } = require("../support/database");

test.beforeEach(async ({ page }) => {
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
});

test.beforeAll(async () => {
    await executeSql('Delete from movies');
});

test.describe("Movies", () => {

    test('deve cadastrar um novo filme como featured', async ({ page }) => {
        const movie = page.data.world_war_z;
        await page.movies.create(movie);
        await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`);
    });

    test('não deve cadastrar quando o filme já existe', async ({ request, page }) => {
        const movie = page.data.resident_evil;
        await request.api.postMovie(movie)
        await page.movies.create(movie)
        await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
    });

    test('deve cadastrar um novo filme como não featured', async ({ page }) => {
        const movie = page.data.dawn_of_the_dead;
        //await page.executeSql(`DELETE FROM movies WHERE title = '${movie.title}';`);
        await page.movies.create(movie);
        await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`);
    });

    test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
        await page.movies.goForm();
        await page.movies.submit();
        await page.movies.alertHaveText("Campo obrigatório");
    });
});
