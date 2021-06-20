import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MODAL_INGREDIENT } from '../../services/actions/actions';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-list-ingredient.module.css';

// @ts-ignore
function BurgerListIngredient({data}) {
    const dispatch = useDispatch();
    const setModalIngredient = () => {
        dispatch({
            type: MODAL_INGREDIENT.SET,
            data: data
        });
    };

    return (
        <div className={styles.ingredient + ' ml-4 mb-10 mt-6'} onClick={setModalIngredient}>
            <img
                className={styles.image}
                src={data.image}
                alt={data.name}
                title={data.name} />
            <div className={styles.price + ' m-2'}>
                <p className="text text_type_digits-default mr-2">{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name + " text text_type_main-default"}>{data.name}</p>
            <Counter count={1} size="default" />
        </div>
    );
}

BurgerListIngredient.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired
}

export default BurgerListIngredient;