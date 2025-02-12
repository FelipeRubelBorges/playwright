const { expect } = require("@playwright/test");

export class Api {

    constructor(request) {
        this.request = request;
        this.token = undefined;
    }

    async setToken() {

        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: "admin@zombieplus.com",
                password: "pwd123"

            }
        })
        expect(response.ok()).toBeTruthy()
        console.log(await response.text)

        const body = JSON.parse(await response.text())
        this.token = 'Bearer ' + body.token;
    }

    async postMovie(movie) {
        await this.setToken()
        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'

            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: 'a9de2dbc-7107-4d59-9d35-c3737976e7a4',
                release_year: movie.release_year,
                cover: movie.cover,
                featured: movie.featured,
            }
        })
        expect(response.ok()).toBeTruthy()
    }

}