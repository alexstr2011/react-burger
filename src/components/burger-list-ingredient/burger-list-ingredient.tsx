import React from 'react';
import styles from './burger-list-ingredient.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

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

export default BurgerListIngredient;