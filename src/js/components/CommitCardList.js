import GitCommitCardDto from '../responseDto/GitCommitCardDto';
import {COMMITS_COUNT} from '../constants/constants';

export default class CommitCardList {
    constructor(cardFactory, api, cardTemplate) {
        this._cardFactory = cardFactory;
        this._api = api;
        this._cardTemplate = cardTemplate;

        this.render = this.render.bind(this);
    }

    render() {
        return this._api.getCommits()
            .then(commits => {
                const slides = commits.slice(0, COMMITS_COUNT).map(item => {
                    // author может иметь значение null в некоторых ответах
                    const image_url = item.author === null ? null : item.author.avatar_url;
                    const gitCommitCardDto = new GitCommitCardDto(item.commit.committer.name,
                        item.commit.committer.email, item.commit.committer.date,
                        item.commit.message, image_url, item.html_url);

                    const commit = this._cardFactory(gitCommitCardDto, this._cardTemplate);
                    return commit.create();
                });
                
                return slides;
            });
    }
}