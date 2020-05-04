export function convertDate(publishedAt) {
    const options = {day: 'numeric', month: 'long', year: 'numeric'}
    const date = new Date(publishedAt).toLocaleDateString('ru-Ru', options);
    //удалил букву г
    const dateParts = date.slice(0, -3).split(' ');
    return `${dateParts[0]} ${dateParts[1]}, ${dateParts[2]}`;
}