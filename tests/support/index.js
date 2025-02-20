const { test: base, expect } = require("@playwright/test");
const { Login } = require("./actions/Login");
const { Movies } = require("./actions/Movies");
const { Popup } = require("./actions/Components");
const { Leads } = require("./actions/Leads");
const { faker } = require("@faker-js/faker");
const data = require("./fixtures/movies");
const { Api } = require("./api");


const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            leads: new Leads(page),
            login: new Login(page),
            movies: new Movies(page),
            popup: new Popup(page),
            faker: faker,
            data: data,
        });
    },
    request: async ({ request }, use) => {
        const context = request

        context['api'] = new Api(request)
        await context['api'].setToken()
        await use(context)
    }
});

module.exports = { test, expect };