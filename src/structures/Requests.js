

const axios = require('axios');

module.exports = class Requests {
    constructor(config) {
        this.api = axios.default.create({
            baseURL: config.api
        });
    }

    get(endpoint, params) {
        return new Promise(async (res, rej) => {
            const { data } = await this.api.post(endpoint, {}, { params });
            return res(data);
        });
    }
}