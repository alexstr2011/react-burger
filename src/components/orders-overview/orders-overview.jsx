import React from 'react';
import PropTypes from 'prop-types';
import styles from './orders-overview.module.css';

function OrdersOverview({data}) {
        const ordersDone = data && data.orders.filter(order => order.status === 'done')
            .filter((_,index) => index < 10);
        const ordersPending = data && data.orders.filter(order => order.status === 'pending')
            .filter((_,index) => index < 10);

    return (
        <section className={styles.wrapper}>
            <table className={styles.table}>
                <tbody>
                <tr className={styles.tableHeader}>
                    <th className={styles.firstColumn}>
                        <p className="text text_type_main-medium">
                            Готовы:
                        </p>
                    </th>
                    <th>
                        <p className="text text_type_main-medium">
                            В работе:
                        </p>
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.firstColumn}>
                        <ul className={styles.list}>
                            {ordersDone && ordersDone.map(order => (
                                <li key={order._id} className={styles.readyOrder}>
                                    <p className="text text_type_digits-default">{order.number}</p>
                                </li>
                            ))}
                        </ul>
                    </td>
                    <td>
                        <ul className={styles.list}>
                            {ordersPending && ordersPending.map(order => (
                                <li key={order._id} className={styles.readyOrder}>
                                    <p className="text text_type_digits-default">{order.number}</p>
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
            <p className="text text_type_main-medium mt-15">
                Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">{data ? data.total : '-'}</p>
            <p className="text text_type_main-medium mt-15">
                Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">{data ? data.totalToday : '-'}</p>
        </section>
    );
}

OrdersOverview.propTypes = {
    data: PropTypes.shape({
        orders: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired
        })).isRequired,
        total: PropTypes.number.isRequired,
        totalToday: PropTypes.number.isRequired,
    })
}

export default OrdersOverview;