import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import styles from './order-info.module.css';
import {WS_ALL_ORDERS_ACTION} from "../../services/actions/orders-actions";
import {ORDER_STATUSES} from "../../utils/data";
import {formatOrderDate} from "../../utils/formatDate";

function OrderInfo() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const allIngredients = useSelector(store => store.burgerIngredientsReducer.data);
    const { wsConnected, data } = useSelector(store => store.allOrdersReducer);
    if (!wsConnected) {
        dispatch({
            type: WS_ALL_ORDERS_ACTION.CONNECTION_START
        });
    }

    let order;
    if (id && data) {
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
        return ingredients.reduce((accum, ingredient) => accum + ingredient.price, 0);
    }, [ingredients]);

    return (
        order ? (
            <section className={styles.wrapper}>
                <p className={"text text_type_digits-default mb-10 " + styles.number}>#{order.number}</p>
                <p className="text text_type_main-medium mb-3">
                    {order.name}
                </p>
                <p className={"text text_type_main-default mb-15 " + styles.status}>
                    {ORDER_STATUSES[order.status]}
                </p>
                <p className="text text_type_main-medium mb-6">
                    Состав:
                </p>
                <ul className={styles.list + ' scrollbar'}>
                    {ingredients.map((ingredient, index) => (
                        <li className={styles.row} key={ingredient._id + index}>
                            <div className={styles.pictureContainer}>
                                <img className={styles.picture} src={ingredient.image} alt={ingredient.name}/>
                            </div>
                            <p className={"text text_type_main-default ml-4 mr-4 " + styles.ingredient}>
                                {ingredient.name}
                            </p>
                            <p className={"text text_type_digits-default mr-2 " + styles.toTheRight}>{ingredient.price}</p>
                            <div className='mr-2'>
                                <CurrencyIcon type="primary"/>
                            </div>

                        </li>
                    ))}
                </ul>
                <div className={styles.row + ' mt-10'}>
                    <p className="text text_type_main-default text_color_inactive">
                        {formatOrderDate(order.createdAt)}
                    </p>
                    <p className={"text text_type_digits-default mr-2 " + styles.toTheRight}>{sum}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </section>
        ) : (<p>Loading...</p>)
    );
}

export default OrderInfo;