import {convertDate} from "../utils/data-converter";

export default class CommitCard {
    constructor(commitInfo, cardTemplate) {
        this._commitInfo = commitInfo;
        this._cardTemplate = cardTemplate;
    }

    create() {
        this.element = this.cardTemplate.content.cloneNode(true).querySelector('.git-card');
        this.element.href = this._commitInfo.url;
        this.element.querySelector('.git-card__commit').textContent = this._commitInfo.message;
        this.element.querySelector('.git-card__date').textContent = convertDate(this._commitInfo.date);
        
        const cardElemUser = this.element.querySelector('.git-card__user');
        cardElemUser.querySelector('.git-card__image').src = this._commitInfo.avatarUrl;
        cardElemUser.querySelector('.git-card__name').textContent = this._commitInfo.author;
        cardElemUser.querySelector('.git-card__email').textContent = this._commitInfo.email;
    
        return this.element;
    }
}