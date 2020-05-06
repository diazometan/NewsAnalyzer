function convertDate(publishedAt) {
    const options = {day: 'numeric', month: 'long', year: 'numeric'}
    const date = new Date(publishedAt).toLocaleDateString('ru-Ru', options);
    //удалил букву г
    const dateParts = date.slice(0, -3).split(' ');
    return `${dateParts[0]} ${dateParts[1]}, ${dateParts[2]}`;
}

function convertDateWithWeekDay(publishedAt) {
    const options = {day: 'numeric', weekday: 'short', month: 'long', year: 'numeric'}
    return new Date(publishedAt).toLocaleDateString('ru-Ru', options);
}

// достаю название месяца
function getMonthName(date) {
    return date.split(', ')[1].split(' ')[1];
}

// достаю дату и день недели
function getDayWithName(date) {
    const splittedDate = date.split(', ');
    const weekday = splittedDate[0];
    const day = splittedDate[1].split(' ')[0];
    return `${day}, ${weekday}`;
}

function splitDate(date) {
    return date.split('T')[0];
}

export {convertDate, convertDateWithWeekDay, getMonthName, getDayWithName, splitDate};