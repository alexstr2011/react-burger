export function formatOrderDate(orderDatePresentation: string): string {
    const orderDate: Date = new Date(orderDatePresentation);
    const dateFormatted: string = new Intl.DateTimeFormat('ru-ru',{
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(orderDate);

    const orderDateMs: number = orderDate.setHours(0,0,0,0);
    const currentDateMs: number = new Date().setHours(0,0,0,0);
    const difference: number = Math.floor(Math.abs(orderDateMs - currentDateMs) / (24 * 60 * 60 * 1000));

    let description: string;
    if (difference === 0) {
        description = 'Сегодня';
    } else if (difference === 1) {
        description = 'Вчера';
    } else {
        description = `${difference} дней назад`;
    }

    return description + ', ' + dateFormatted;
}