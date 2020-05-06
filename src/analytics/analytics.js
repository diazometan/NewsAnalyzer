import './analytics.css';

import DataStorage from '../js/modules/DataStorage';
import Statistics from '../js/components/Statistics'

const searchInfoElem = document.querySelector('.search-info__container');
const tbodyElem = document.querySelector('.tbody');
const tableRowTemplate = document.querySelector('[data-component="TableRowTemplate"]');

const dataStorage = new DataStorage();

const statistics = new Statistics(searchInfoElem, dataStorage, tableRowTemplate, tbodyElem);
statistics.setKeywordFromLS();
statistics.setStatistics();
statistics.createDiagramm();