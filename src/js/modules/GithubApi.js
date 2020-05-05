export default class GithubApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;

        this._methods = {
            get: 'GET'
        };
    }

    getCommits() {
        return fetch(this._baseUrl, {
            method: this._methods.get,
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch(err => {
            throw err;
        });
    }
}