import React from 'react';
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-list-ingredient.module.css';

// @ts-ignore
function BurgerListIngredient({ingredient}) {
    return (
        <div className={styles.ingredient + ' ml-4 mb-10 mt-6'}>
            <img
                className={styles.image}
                src={ingredient.image}
                alt={ingredient.name}
                title={ingredient.name} />
            <div className={styles.price + ' m-2'}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name + " text text_type_main-default"}>{ingredient.name}</p>
            <Counter count={1} size="default" />
        </div>
    );
}

BurgerListIngredient.propTypes = {
    ingredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
}

export default BurgerListIngredient;