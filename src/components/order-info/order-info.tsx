import React, {FC} from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder, useDispatch, useSelector} from "../../services/types/types";
import { useParams,useLocation } from 'react-router-dom';
import styles from './order-info.module.css';
import {WS_ALL_ORDERS_ACTION, WS_USER_ORDERS_ACTION} from "../../services/actions/orders-actions";
import {ORDER_STATUSES} from "../../utils/data";
import {formatOrderDate} from "../../utils/formatDate";
import {getCookie} from "../../utils/cookies";

const OrderInfo: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams<{id: string}>();
    const allIngredients = useSelector(store => store.burgerIngredientsReducer.data);

    const isFeed = location.pathname.includes('/feed');

    let allOrdersReducer = useSelector(store => store.allOrdersReducer);
    if (isFeed && allOrdersReducer && !allOrdersReducer.wsConnected) {
        dispatch({
            type: WS_ALL_ORDERS_ACTION.CONNECTION_START
        });
    }

    let userOrdersReducer = useSelector(store => store.userOrdersReducer);
    if (!isFeed && userOrdersReducer && !userOrdersReducer.wsConnected ) {
        dispatch({
            type: WS_USER_ORDERS_ACTION.CONNECTION_START,
            token: getCookie('accessToken')
        });
    }

    const data = isFeed ? allOrdersReducer.data : userOrdersReducer.data;

    let order: TOrder | undefined;
    if (id && data && data.orders) {
        order = data.orders.find(order => order._id === id);
    }

    const ingredients = React.useMemo(()=>{
        if (!order) return null;
        return order.ingredients
            .map(ingredient_id => allIngredients
                .find(ingredient => ingredient._id === ingredient_id))
            .filter(ingredient => ingredient);
    }, [order, allIngredients]);

    const sum = React.useMemo(()=>{
        if (!ingredients) return 0;
        return ingredients.reduce((accum, ingredient) =>
            accum + (ingredient?.price || 0), 0);
    }, [ingredients]);

    const statusDescription: string | undefined =
        Object.values(ORDER_STATUSES).find(status => order && status === order.status);

    return (
        order ? (
            <section className={styles.wrapper}>
                <p className={"text text_type_digits-default mb-10 " + styles.number}>#{order.number}</p>
                <p className="text text_type_main-medium mb-3">
                    {order.name}
                </p>
                <p className={"text text_type_main-default mb-15 " + styles.status}>
                    { statusDescription }
                </p>
                <p className="text text_type_main-medium mb-6">
                    Состав:
                </p>
                <ul className={styles.list + ' scrollbar'}>
                    {ingredients && ingredients.map((ingredient, index) => (
                        ingredient && (
                            <li className={styles.row} key={ingredient._id + index}>
                                <div className={styles.pictureContainer}>
                                    <img className={styles.picture} src={ingredient.image} alt={ingredient.name}/>
                                </div>
                                <p className={"text text_type_main-default ml-4 mr-4 " + styles.ingredient}>
                                    {ingredient.name}
                                </p>
                                <p className={"text text_type_digits-default mr-2 " + styles.toTheRight}>
                                    {ingredient.price}
                                </p>
                                <div className='mr-2'>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </li>
                        )
                    ))}
                </ul>
                <div className={styles.row + ' mt-10 mb-10'}>
                    <p className="text text_type_main-default text_color_inactive">
                        {formatOrderDate(order.createdAt)}
                    </p>
                    <p className={"text text_type_digits-default mr-2 " + styles.toTheRight}>{sum}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </section>
        ) : (<p>Loading...</p>)
    );
};

export default OrderInfo;