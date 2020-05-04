import NewsCardResponseDto from '../responseDto/NewsCardResponseDto';
import {NEWS_CARDS_COUNT} from '../constants/constants';

export default class NewsCardList {
    constructor(element, cardFactory, api, dataStorage, newsCardTemplate) {
        this._container = element.querySelector('.cards');
        this._button = element.querySelector('.search-result__button');
        this._resultElem = element.querySelector('.search-result__found');
        this._loadingElem = element.querySelector('.search-result__loading');
        this._notFoundElem = element.querySelector('.search-result__not-found');

        this._cardFactory = cardFactory;
        this._newsCardTemplate = newsCardTemplate;

        this._currentCount = 0;
        this._totalCount = 0;

        this._api = api;
        this._dataStorage = dataStorage;

        this._showMore = this._showMore.bind(this);

        this.render = this.render.bind(this);
        this.renderDefault = this.renderDefault.bind(this);
    }

    addEventListener() {
        this._button.addEventListener('click', this._showMore);
    }

    renderDefault(cards) {
        this._resetContainer();

        this._totalCount = cards.length;
        this._addCards(cards.slice(0, NEWS_CARDS_COUNT));
        this._showResponse();

        if (this._currentCount === this._totalCount) {
            this._hideShowMoreButton();
        }
    }

    render(keyWord) {
        this._resetContainer();
        this._startLoading();

        this._api.getNews(keyWord)
            .then(cards => {
                this._dataStorage.setNews(cards.articles);
                this._dataStorage.setKeyWord(keyWord);

                const currentCount = cards.articles.length > NEWS_CARDS_COUNT 
                    ? NEWS_CARDS_COUNT : cards.articles.length;
                this._totalCount = cards.articles.length;

                this._addCards(cards.articles.slice(0, currentCount));
                this._showResponse();
            })
            .then(() => {
                if (this._currentCount === this._totalCount) {
                    this._hideShowMoreButton();
                }

                if (this._totalCount === 0) {
                    this._dataStorage.clear();
                }
            })
            .catch(() => {

            })
    }

    _showMore() {
        const cards = this._dataStorage.getNews()
            .slice(this._currentCount, this._currentCount + NEWS_CARDS_COUNT);

        this._addCards(cards);

        if (this._currentCount === this._totalCount) {
            this._hideShowMoreButton();
        }
    }

    _addCards(cards) {
        this._currentCount += cards.length;

        cards.forEach(card => {
            const newsCardResponseDto = new NewsCardResponseDto(card.source.name, card.title,
                card.publishedAt, card.description, card.urlToImage, card.url);
            const newsCard = this._cardFactory(newsCardResponseDto, this._newsCardTemplate);
            this._container.appendChild(newsCard.create());
        });
    }

    _resetContainer() {
        while (this._container.firstChild) {
            this._container.removeChild(this._container.firstChild);
        }
        this._container.style.marginBottom = '0';
        this._button.style.display = 'block';

        this._currentCount = 0;
        this._totalCount = 0;
    }

    _hideShowMoreButton() {
        this._button.style.display = 'none';
        this._container.style.marginBottom = '80px';
    }

    _startLoading() {
        this._resultElem.style.display = 'none';
        this._notFoundElem.style.display = 'none';
        this._loadingElem.style.display = 'flex';
    }

    _showResponse() {
        this._loadingElem.style.display = 'none';
        if (this._totalCount === 0) {
            this._notFoundElem.style.display = 'flex';
        }
        else {
            this._resultElem.style.display = 'flex';
        }
    }
}