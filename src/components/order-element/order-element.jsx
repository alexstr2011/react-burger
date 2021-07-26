import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ORDER_STATUSES} from "../../utils/data";
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import styles from './order-element.module.css';
import {formatOrderDate} from "../../utils/formatDate";

function OrderElement({data}) {
    const allIngredients = useSelector(store => store.burgerIngredientsReducer.data);

    const ingredients = React.useMemo(()=>{
        return data.ingredients
            .map(ingredient_id => allIngredients
                .find(ingredient => ingredient._id === ingredient_id))
            .filter(ingredient => ingredient);
    }, [data.ingredients, allIngredients]);

    const sum = React.useMemo(()=>{
        return ingredients.reduce((accum, ingredient) => accum + ingredient.price, 0);
    }, [ingredients]);

    const showIngredients = ingredients.filter((_,index) => index < 5);

    const dateFormatted = new Intl.DateTimeFormat('ru-ru',{
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(data.createdAt));

    const diffDays = Math.floor(Math.abs(new Date() - new Date(data.createdAt)) / (1000 * 60 * 60 * 24));
    let dateDescr = '';
    if (diffDays === 0) {
        dateDescr = 'Сегодня, ';
    } else if (diffDays === 1) {
        dateDescr = 'Вчера, ';
    } else {
        dateDescr = `${diffDays} дня(ей) назад, `;
    }

    return (
        <section className={styles.wrapper + ' ' + styles.feed + ' p-6'}>
            <div className={styles.row + ' ' + styles.rowFar}>
                <p className="text text_type_digits-default">
                    #{data.number}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    {formatOrderDate(data.createdAt)}
                </p>
            </div>
            <p className="text text_type_main-medium mt-6 mb-2">
                {data.name}
            </p>
            <p className={"text text_type_main-default mb-6 " + styles.readyOrder}>
                {ORDER_STATUSES[data.status]}
            </p>
            <div className={styles.row + ' ' + styles.rowFar}>
                <ul className={styles.picturesList + ' ' + styles.row}>
                    {showIngredients && showIngredients.map((ingredient,index) => (
                        <li key={ingredient._id + index} className={styles.pictureContainer}>
                            <img src={ingredient.image} alt={ingredient.name} className={styles.picture} />
                        </li>
                    ))}
                </ul>
                <div className={styles.row}>
                    <p className="text text_type_digits-default mr-2">
                        {sum}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    );
}

OrderElement.propTypes = {
    data: PropTypes.shape({
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        createdAt: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired
}

export default OrderElement;