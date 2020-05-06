import {capitalizeFirstLetter} from '../utils/capitalize-first-letter';
import {MIN_MENTIONS_COUNT} from '../constants/constants';
import {convertDateWithWeekDay, getMonthName, getDayWithName} from '../utils/data-converter';

export default class Statistics {
    constructor(searchInfoElem, dataStorage, tableRowTemplate, tbodyElem) {
        this._keywordElem = searchInfoElem.querySelector('.search-info__keyword');
        this._newsCountElem = searchInfoElem.querySelector('.search-info__news-count')
            .querySelector('.search-info__number');
        this._titleCountElem = searchInfoElem.querySelector('.search-info__article-count')
            .querySelector('.search-info__number');

        this._tableRowTemplate = tableRowTemplate;
        this._tbodyElem = tbodyElem;

        this._dataStorage = dataStorage;
    }

    setKeywordFromLS() {
        this._keywordElem.textContent = capitalizeFirstLetter(this._dataStorage.getKeyword());
    }

    setStatistics() {
        const news = this._dataStorage.getNews();
        this._newsCountElem.textContent = this._dataStorage.getNewsCount()
        this._titleCountElem.textContent = this._countMentionsKeyword(news.map(x => x.title));
    }

    createDiagramm() {
        const news = this._dataStorage.getNews();
        const groupedNews = this._groupNewsByDate(news);
        const domRows = this._createDomRows(groupedNews);

        this._tbodyElem.querySelector('.table__scale_position_top')
            .after(...domRows, this._tbodyElem.querySelector('.table__scale_position_bottom'));
        this._tbodyElem.querySelector('.table__month').textContent = `(${getMonthName(groupedNews[0].date)})`;
    }

    _createDomRows(groupedNews) {
        return groupedNews.map(x => {
            const titleMentionsCount = this._countMentionsKeyword(x.titles);
            const descriptionMentionsCount = this._countMentionsKeyword(x.descriptions);
            // descriptions, который приходит с api может не содержкать всей инфы, так как обрезан
            // предполагаю, что как минимум 1 раз там встречается ключевое слово
            const mentionsCount = titleMentionsCount + (descriptionMentionsCount === 0 ? 1 : descriptionMentionsCount);
            return this._createRow(x.date, mentionsCount);
        });
    }

    _createRow(date, mentionsCount) {
        const tableRow = this._tableRowTemplate.content.cloneNode(true).querySelector('.table__row');
        tableRow.querySelector('.table__date').textContent = getDayWithName(date);
        tableRow.querySelector('.table__diagram-line').style.width = `${mentionsCount}%`;
        // На маленьких разрешениях ширина слишком маленькая, чтобы вмести цифры
        // при наведении на полоску, появляется title
        if (mentionsCount > MIN_MENTIONS_COUNT) {
            tableRow.querySelector('.table__diagram-data').textContent = mentionsCount;
        } else {
            tableRow.querySelector('.table__diagram-line').title = `Количество упоминаний ${mentionsCount}`
        }
        return tableRow;
    }

    _groupNewsByDate(news) {
        const groupedNews = [];
        news.forEach(x => {
            const date = convertDateWithWeekDay(x.publishedAt);
            const title = x.title;
            const description = x.description;

            const item = groupedNews.find(y => y.date === date);
            if (item) {
                item.titles.push(title);
                item.descriptions.push(description);
            } else {
                groupedNews.push({
                    date,
                    titles: [title],
                    descriptions: [description]
                });
            }
        });
        groupedNews.reverse();

        return groupedNews;
    }

    _countMentionsKeyword(items) {
        const keyword = this._dataStorage.getKeyword().toLowerCase();
        const reg = new RegExp(keyword, 'g');
        return items.reduce((sum, item) => {
            return sum + (item.toLowerCase().match(reg) || []).length;
        }, 0);
    }
}