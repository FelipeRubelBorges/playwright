const { test: base, expect } = require("@playwright/test");

const { Login } = require("./actions/Login");
const { Movies } = require("./actions/Movies");
const { Toast } = require("./actions/Components");
const { executeSql } = require("./database");
const { Leads } = require("./actions/Leads");
const { faker } = require("@faker-js/faker");
const data = require("./fixtures/movies");


const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            leads: new Leads(page),
            login: new Login(page),
            movies: new Movies(page),
            toast: new Toast(page),
            executeSql: executeSql,
            faker: faker,
            data: data,
        });
    }
});

module.exports = { test, expect };