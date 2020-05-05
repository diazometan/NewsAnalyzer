import {convertDate} from '../utils/data-converter';

export default class NewsCard {
    constructor(newsInfo, cardTemplate) {
        this._newsInfo = newsInfo;
        this._cardTemplate = cardTemplate;
    }

    create() {
        const newsCard = this._cardTemplate.content.cloneNode(true).querySelector('.card');
        newsCard.href = this._newsInfo.urlToNews;

        if (this._newsInfo.urlToImage) {
            newsCard.querySelector('.card__image').src = this._newsInfo.urlToImage;
        }
        
        const cardElemText = newsCard.querySelector('.card__text');
        cardElemText.querySelector('.card__date').textContent = convertDate(this._newsInfo.publishedAt);
        cardElemText.querySelector('.card__title').textContent = this._newsInfo.title;
        cardElemText.querySelector('.card__discription').textContent = this._newsInfo.description;
        cardElemText.querySelector('.card__author').textContent = this._newsInfo.author;

        return newsCard;
    }
}