# NewsAnalyzer
Дипломный проект в ЯндексПрактикум`е

### Описание

Cервис для анализа происходящих в мире событий. Его задача — установить, насколько популярны новости на определённую тему.
Поиск ведется по российским новостям по ключевову слову, введенного в форму. Сервис API — https://newsapi.org

### Технологии

Стек:
* HTML
* CSS
* Нативный JavaScript

Для сборки проекта использован Webpack:
* оптимизированы картинки и шрифты
* минимизация CSS кода 
* добавлены вендорные префиксы
* транспиляция JS-кода в Babel

Демо проекта: https://diazometan.github.io/NewsAnalyzer/

Для запуска проекта локально:

- `git clone https://github.com/diazometan/NewsAnalyzer.git` - клонировать репозиторий
- `gic checkout level-1` - для того, чтобы перейти на ветку с версткой
- `npm install` - установить все необходимые пакеты
- `npm run dev` - проект будет откроется в браузере на порте 8080

При установке пакетов, также будет установлены пакеты: cross-env, который нужен для корректной работы переменных среды
в Windows и swiper для создания слайдера.