import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ORDER_STATUSES} from "../../utils/data";
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import styles from './order-element.module.css';
import {formatOrderDate} from "../../utils/formatDate";

function OrderElement({data, isHistory = false}) {
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

    const showIngredients = ingredients.filter((_,index) => index <= 5);
    const hiddenIngredients = (ingredients.length !== showIngredients.length)
        ? ingredients.length - showIngredients.length + 1 : 0;

    return (
        <section className={styles.wrapper + ' ' + (isHistory ? styles.history : styles.feed) + ' p-6'}>
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
                    {showIngredients && showIngredients.map((ingredient,index) => {
                        const isShowHidden = !!hiddenIngredients && index === 0;

                        return (
                            <li key={ingredient._id + index} className={styles.pictureContainer}>
                                <img src={ingredient.image} alt={ingredient.name} className={styles.picture} />
                                {isShowHidden && (
                                    <p className={"text text_type_main-default " + styles.hiddenIngredients}>
                                        {`+${hiddenIngredients}`}
                                    </p>
                                )}
                            </li>
                        )
                    }
                    )}
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
    }).isRequired,
    isHistory: PropTypes.bool
}

export default OrderElement;