import {DAYS_BEFORE} from '../constants/constants';
import {splitDate} from '../utils/data-converter';

export default class NewsApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._apiKey = options.apiKey;

        this._methods = {
            get: 'GET'
        };
    }

    getNews(keyword) {
        return fetch(this._baseUrl + this._createGetRequestUrl(keyword), {
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

    _createGetRequestUrl(keyword) {
        const today = new Date();
        const offset = new Date();
        offset.setDate(offset.getDate() - DAYS_BEFORE);
        return `everything?q=${keyword}&language=ru` +
            `&from=${splitDate(offset.toISOString())}&to=${splitDate(today.toISOString())}` +
            `&page=1&pageSize=100&sortBy=publishedAt&apiKey=${this._apiKey}`;
    }
}