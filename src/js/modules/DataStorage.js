import {localStorageItems} from '../constants/constants';

export default class DataStorage {
    constructor() {
    }

    setNews(news) {
        localStorage.setItem(localStorageItems.newsArticles, JSON.stringify(news.articles));
        localStorage.setItem(localStorageItems.newsCount, JSON.stringify(news.totalResults));
    }

    getNews() {
        return JSON.parse(localStorage.getItem(localStorageItems.newsArticles));
    }

    getNewsCount() {
        return localStorage.getItem(localStorageItems.newsCount);
    }

    setKeyword(keyword) {
        localStorage.setItem(localStorageItems.keyword, keyword);
    }

    getKeyword() {
        return localStorage.getItem(localStorageItems.keyword);
    }

    clear() {
        localStorage.clear();
    }
}