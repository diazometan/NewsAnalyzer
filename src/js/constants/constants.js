const NEWS_CARDS_COUNT = 3;
const DAYS_BEFORE = 7;
const MIN_MENTIONS_COUNT = 3;
const COMMITS_COUNT = 20;

const errors = {
    isRequired: 'Нужно ввести ключевое слово'
};

const displayStyles = {
    none: 'none',
    block: 'block',
    flex: 'flex'
}

const localStorageItems = {
    newsArticles: 'newsArticles',
    newsCount: 'newsCount',
    keyword: 'keyword'
}

export {NEWS_CARDS_COUNT, DAYS_BEFORE, MIN_MENTIONS_COUNT, COMMITS_COUNT, errors, displayStyles, localStorageItems};