const { test: base, expect } = require("@playwright/test");

const { LoginPage } = require("../pages/Loginpage");
const { MoviesPage } = require("../pages/MoviesPage");
const { Toast } = require("../pages/Components");
const { executeSql } = require("./database");
const { LandingPage } = require("../pages/LandingPage");
const { faker } = require("@faker-js/faker");
const data = require("../support/fixtures/movies");


const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page),
            executeSql: executeSql,
            faker: faker,
            data: data,
        });
    }
});

module.exports = { test, expect };