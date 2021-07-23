import React from 'react';
import OrdersOverview from "../components/orders-overview/orders-overview";
import OrderElement from "../components/order-element/order-element";
import styles from './feed.module.css';

function FeedPage() {
    return (
        <div className={styles.allWrapper}>
            <p className="text text_type_main-large mt-10 mb-5">
                Лента заказов
            </p>
            <div className={styles.wrapper}>
                <ul className={styles.list + ' scrollbar'}>
                    <li><OrderElement/></li>
                    <li><OrderElement/></li>
                    <li><OrderElement/></li>
                    <li><OrderElement/></li>
                    <li><OrderElement/></li>
                </ul>
                <OrdersOverview/>
            </div>
        </div>
    );
}

export default FeedPage;