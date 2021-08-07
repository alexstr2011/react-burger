import React, {FC} from 'react';
import OrderElement from "../components/order-element/order-element";
import ProfileMenu from "../components/profile-menu/profile-menu";
import styles from './history.module.css';
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../services/types/types";
import {WS_USER_ORDERS_ACTION} from "../services/actions/orders-actions";
import {getCookie} from "../utils/cookies";

const HistoryPage: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { wsConnected, data } = useSelector(store => store.userOrdersReducer);
    if (!wsConnected) {
        dispatch({
            type: WS_USER_ORDERS_ACTION.CONNECTION_START,
            token: getCookie('accessToken')
        });
    }

    const orders = data && data.orders;

    return (
        <div className={styles.wrapper}>
            <ProfileMenu/>
            <ul className={styles.list + ' scrollbar'}>
                {orders && orders.map(order => (
                    <li key={order._id}>
                        <Link className={styles.link}
                              to={{
                                  pathname: `/profile/orders/${order._id}`,
                                  state: {background: location}
                              }}>
                            <OrderElement data={order} isHistory />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default HistoryPage;