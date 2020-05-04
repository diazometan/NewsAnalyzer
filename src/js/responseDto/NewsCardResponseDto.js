// Класс обертка, чтобы сгрупировать поля
export default class NewsCardResponseDto {
    constructor(author, title, publishedAt, description, urlToImage, urlToNews) {
        this.author = author;
        this.title = title;
        this.publishedAt = Date.parse(publishedAt);
        this.description = description;
        this.urlToImage = urlToImage;
        this.urlToNews = urlToNews;
    }
}