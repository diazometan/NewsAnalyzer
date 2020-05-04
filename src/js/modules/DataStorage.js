export default class DataStorage {
    constructor() {

    }

    setNews(news) {
        localStorage.setItem('news', JSON.stringify(news));
    }

    getNews() {
        return JSON.parse(localStorage.getItem('news'));
    }

    removeNews() {
        localStorage.removeItem('news');
    }

    setKeyWord(keyWord) {
        localStorage.setItem('keyWord', keyWord);
    }

    getKeyWord() {
        return localStorage.getItem('keyWord');
    }

    removeKeyWord() {
        localStorage.removeItem('keyWord');
    }

    clear() {
        localStorage.clear();
    }
}