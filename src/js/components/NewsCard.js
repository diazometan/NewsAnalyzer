import {convertDate} from '../utils/data-converter';

export default class NewsCard {
    constructor(newsInfo, cardTemplate) {
        this.newsInfo = newsInfo;
        this.cardTemplate = cardTemplate;
    }

    create() {
        this.element = this.cardTemplate.content.cloneNode(true).querySelector('.card');
        this.element.href = this.newsInfo.urlToNews;
        this.element.querySelector('.card__image').src = this.newsInfo.urlToImage;
        
        const cardElemText = this.element.querySelector('.card__text');
        cardElemText.querySelector('.card__date').textContent = convertDate(this.newsInfo.publishedAt);
        cardElemText.querySelector('.card__title').textContent = this.newsInfo.title;
        cardElemText.querySelector('.card__discription').textContent = this.newsInfo.description;
        cardElemText.querySelector('.card__author').textContent = this.newsInfo.author;

        return this.element;
    }
}