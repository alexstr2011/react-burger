export function formatOrderDate(orderDatePresentation) {
    let orderDate = new Date(orderDatePresentation);
    const dateFormatted = new Intl.DateTimeFormat('ru-ru',{
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(orderDate);

    orderDate = orderDate.setHours(0,0,0,0);
    const currentDate = new Date().setHours(0,0,0,0);
    const difference = Math.floor(Math.abs(orderDate - currentDate) / (24 * 60 * 60 * 1000));

    let description;
    if (difference === 0) {
        description = 'Сегодня';
    } else if (difference === 1) {
        description = 'Вчера';
    } else {
        description = `${difference} дней назад`;
    }

    return description + ', ' + dateFormatted;
}