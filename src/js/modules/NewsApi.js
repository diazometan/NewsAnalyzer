import {DAYS_BEFORE} from '../constants/constants';

export default class NewsApi {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.apiKey = options.apiKey;

        this.methods = {
            get: 'GET'
        };
    }

    getNews(keyword) {
        return fetch(this.baseUrl + this._createGetRequestUrl(keyword), {
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

    _createGetRequestUrl(keyword) {
        const today = new Date();
        const offset = new Date();
        offset.setDate(offset.getDate() - DAYS_BEFORE);
        return `everything?q=${keyword}&language=ru` + `&from=${offset.toISOString()}&to=${today.toISOString()}` +
            `&page=1&pageSize=100&sortBy=publishedAt&apiKey=${this.apiKey}`;
    }
}