import {convertDate} from "../utils/data-converter";

export default class CommitCard {
    constructor(commitInfo, cardTemplate) {
        this._commitInfo = commitInfo;
        this._cardTemplate = cardTemplate;
    }

    create() {
        const commitCard = this._cardTemplate.content.cloneNode(true).querySelector('.swiper-slide');
        commitCard.querySelector('.git-card').href = this._commitInfo.url;
        commitCard.querySelector('.git-card__commit').textContent = this._commitInfo.message;
        commitCard.querySelector('.git-card__date').textContent = convertDate(this._commitInfo.date);
        
        const cardElemUser = commitCard.querySelector('.git-card__user');
        cardElemUser.querySelector('.git-card__name').textContent = this._commitInfo.author;
        cardElemUser.querySelector('.git-card__email').textContent = this._commitInfo.email;

        if (this._commitInfo.avatarUrl) {
            cardElemUser.querySelector('.git-card__image').src = this._commitInfo.avatarUrl;
            cardElemUser.querySelector('.git-card__image').style.borderRadius = '100%';
        }
    
        return commitCard;
    }
}