import {config} from '../constants/config';

export default class GithubApi {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

        this.methods = {
            get: 'GET'
        };
    }

    getCommits() {
        return fetch(config.GithubApi, {
            method: this.methods.get,
            headers: this.headers
        })
        .then(res => {
            if (res.ok)
                return res.json();
            else
                return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch(err => {
            throw err;
        });
    }
}