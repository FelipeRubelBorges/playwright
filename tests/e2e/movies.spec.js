const { test } = require("../support");

test.beforeEach(async ({ page }) => {
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.executeSql('Delete from movies');
});

test.describe("Movies", () => {

    test('deve cadastrar um novo filme como featured', async ({ page }) => {
        const movie = page.data.world_war_z;
        //await page.executeSql(`DELETE FROM movies WHERE title = '${movie.title}';`);
        await page.movies.create(movie);
        await page.toast.containsText("Cadastro realizado com sucesso!");
    });

    test('não deve cadastrar quando o filme já existe', async ({ page }) => {
        const movie = page.data.resident_evil;
        const response = await request.post("http://localhost:3333/movies", {
            data: {
                title: movie.title,
                overview: movie.overview,
                company: movie.company,
                release_year: movie.release_year,
                cover: movie.cover,
                featured: false,
            },
        });
        expect(response.ok());
        await page.movies.create(movie);
        await page.toast.containsText("Oops!Este conteúdo já encontra-se cadastrado no catálogo")
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
