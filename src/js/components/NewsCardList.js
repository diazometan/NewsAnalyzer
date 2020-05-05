import NewsCardDto from '../responseDto/NewsCardDto';
import {displayStyles, NEWS_CARDS_COUNT} from '../constants/constants';

export default class NewsCardList {
    constructor(element, cardFactory, api, dataStorage, cardTemplate) {
        this._container = element.querySelector('.cards');
        this._button = element.querySelector('.search-result__button');
        this._resultFoundElem = element.querySelector('.search-result__found');
        this._loadingElem = element.querySelector('.search-result__loading');
        this._notFoundElem = element.querySelector('.search-result__not-found');
        this._failedElem = element.querySelector('.search-result__failed');

        this._cardFactory = cardFactory;
        this._cardTemplate = cardTemplate;

        this._currentCount = 0;
        this._totalCount = 0;

        this._api = api;
        this._dataStorage = dataStorage;

        this._showMore = this._showMore.bind(this);

        this.render = this.render.bind(this);
        this.renderFromLS = this.renderFromLS.bind(this);
    }

    addEventListener() {
        this._button.addEventListener('click', this._showMore);
    }

    renderFromLS(cards) {
        this._resetContainer();

        this._totalCount = cards.length;
        this._addCards(cards.slice(0, NEWS_CARDS_COUNT));
        this._showResponse();
    }

    render(keyword) {
        this._resetContainer();
        this._startLoading();

        this._api.getNews(keyword)
            .then(cards => {
                this._dataStorage.setNews(cards);
                this._dataStorage.setKeyword(keyword);

                const cardsCount = cards.articles.length > NEWS_CARDS_COUNT
                    ? NEWS_CARDS_COUNT : cards.articles.length;
                this._totalCount = cards.articles.length;

                this._addCards(cards.articles.slice(0, cardsCount));
                this._showResponse();
            })
            .catch(() => {
                this._showError();
            })
    }

    _showMore() {
        const cards = this._dataStorage.getNews()
            .slice(this._currentCount, this._currentCount + NEWS_CARDS_COUNT);

        this._addCards(cards);
        this._hideShowMoreButton();
    }

    _addCards(cards) {
        this._currentCount += cards.length;

        const domCards = cards.map(card => {
            const newsCardDto = new NewsCardDto(card.source.name, card.title,
                card.publishedAt, card.description, card.urlToImage, card.url);
            const newsCard = this._cardFactory(newsCardDto, this._cardTemplate);
            return newsCard.create();
        });

        this._container.append(...domCards);
    }

    _resetContainer() {
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }
        this._button.style.display = displayStyles.block;

        this._currentCount = 0;
        this._totalCount = 0;
    }

    _startLoading() {
        this._resultFoundElem.style.display = displayStyles.none;
        this._failedElem.style.display = displayStyles.none;
        this._notFoundElem.style.display = displayStyles.none;
        this._loadingElem.style.display = displayStyles.flex;
    }

    _showResponse() {
        this._loadingElem.style.display = displayStyles.none;
        if (this._totalCount === 0) {
            this._notFoundElem.style.display = displayStyles.flex;
            this._dataStorage.clear();
        } else {
            this._resultFoundElem.style.display = displayStyles.flex;
            this._hideShowMoreButton();
        }
    }

    _hideShowMoreButton() {
        if (this._currentCount === this._totalCount) {
            this._button.style.display = displayStyles.none;
        }
    }

    _showError() {
        this._loadingElem.style.display = displayStyles.none;
        this._failedElem.style.display = displayStyles.flex;
        this._dataStorage.clear();
    }
}