// Класс обертка, чтобы сгрупировать поля
export default class GitCommitCardDto {
    constructor(author, email, date, message, avatarUrl, url) {
        this.author = author;
        this.email = email;
        this.date = date;
        this.message = message;
        this.avatarUrl = avatarUrl;
        this.url = url;
    }
}