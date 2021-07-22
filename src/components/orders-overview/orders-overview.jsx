import React from 'react';
import styles from './orders-overview.module.css';

function OrdersOverview() {
    return (
        <section className={styles.wrapper}>
            <table className={styles.table}>
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
                            <li className={styles.readyOrder}>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                        </ul>
                    </td>
                    <td>
                        <ul className={styles.list}>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034538</p>
                            </li>
                            <li>
                                <p className="text text_type_digits-default">034533</p>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
            <p className="text text_type_main-medium mt-15">
                Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">28752</p>
            <p className="text text_type_main-medium mt-15">
                Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">138</p>
        </section>
    );
}

export default OrdersOverview;