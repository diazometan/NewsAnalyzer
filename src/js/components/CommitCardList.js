export default class CommitCardList {
    constructor(container, cardFactory, api, gitCardTemplate) {
        this.container = container;
        this.cardFactory = cardFactory;
        this.api = api;

        this.gitCardTemplate = gitCardTemplate;

        this.render = this.render.bind(this);
    }

    render() {
        
    }
}