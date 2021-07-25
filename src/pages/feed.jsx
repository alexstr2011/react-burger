import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import OrdersOverview from "../components/orders-overview/orders-overview";
import OrderElement from "../components/order-element/order-element";
import styles from './feed.module.css';
import {WEB_SOCKET_ACTION, WEB_SOCKET_TYPE} from "../services/actions/orders-actions";

function FeedPage() {
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch({
            type: WEB_SOCKET_ACTION.CONNECTION_START,
            socketType: WEB_SOCKET_TYPE.ALL_ORDERS
        });
    },[]);

    const { data } = useSelector(store => store.ordersReducer[WEB_SOCKET_TYPE.ALL_ORDERS]);
    const orders = data && data.orders;

    return (
        <div className={styles.allWrapper}>
            <p className="text text_type_main-large mt-10 mb-5">
                Лента заказов
            </p>
            <div className={styles.wrapper}>
                <ul className={styles.list + ' scrollbar'}>
                    {orders && orders.map(order => (
                        <li key={order._id}><OrderElement data={order} /></li>
                    ))}
                </ul>
                <OrdersOverview data={data} />
            </div>
        </div>
    );
}

export default FeedPage;