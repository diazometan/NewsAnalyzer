import './index.css';

import {config} from './js/constants/config';
import NewsApi from './js/modules/NewsApi';
import DataStorage from './js/modules/DataStorage';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import SearchInput from './js/components/SearchInput';

const searchResultElem = document.querySelector('.search-result');
const searchFormElem = document.querySelector('.search__form');
const newsCardTemplate = document.querySelector('[data-component="NewsCardTemplate"]');

const isDev = NODE_ENV === 'development';

const newsApi = new NewsApi({
    baseUrl: isDev ? config.newsUrl : config.prodNewsUrl,
    apiKey: config.newsApiKey,
    headers: {}
});
const dataStorage = new DataStorage();

const newsCardFactory = (newsInfo, newsCardTemplate) => new NewsCard(newsInfo, newsCardTemplate);

const newsCardList = new NewsCardList(searchResultElem, newsCardFactory, newsApi, dataStorage, newsCardTemplate);
newsCardList.addEventListener();

const searchInput = new SearchInput(newsCardList.render, searchFormElem);
searchInput.addEventListener();

newsCardList.addFormDisabledCallback(searchInput.setFormDisabled);
newsCardList.addFormEnabledCallback(searchInput.setFormEnabled);

const newsKeyword = dataStorage.getKeyword();
const newsInStorage = dataStorage.getNews();
if (newsKeyword && newsInStorage) {
    searchInput.setLSInputValue(newsKeyword);
    newsCardList.renderFromLS(newsInStorage);
}
