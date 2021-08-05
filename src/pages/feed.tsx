import React, {FC} from 'react';
import {useDispatch, useSelector} from "../services/types/types";
import { Link, useLocation } from 'react-router-dom';
import OrdersOverview from "../components/orders-overview/orders-overview";
import OrderElement from "../components/order-element/order-element";
import styles from './feed.module.css';
import {WS_ALL_ORDERS_ACTION} from "../services/actions/orders-actions";

const FeedPage: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { wsConnected, data } = useSelector(store => store.allOrdersReducer);
    if (!wsConnected) {
        dispatch({
            type: WS_ALL_ORDERS_ACTION.CONNECTION_START
        });
    }

    const orders = data && data.orders;

    return (
        <div className={styles.allWrapper}>
            <p className="text text_type_main-large mt-10 mb-5">
                Лента заказов
            </p>
            <div className={styles.wrapper}>
                <ul className={styles.list + ' scrollbar'}>
                    {orders && orders.map(order => (
                        <li key={order._id}>
                            <Link className={styles.link}
                                  to={{
                                      pathname: `/feed/${order._id}`,
                                      state: {background: location}
                                  }}>
                                <OrderElement data={order}/>
                            </Link>
                        </li>
                    ))}
                </ul>
                <OrdersOverview data={data} />
            </div>
        </div>
    );
};

export default FeedPage;