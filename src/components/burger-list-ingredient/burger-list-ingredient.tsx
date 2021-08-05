import React, {FC} from 'react';
import { useDrag } from 'react-dnd';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-list-ingredient.module.css';
import {TIngredient} from "../../services/types/types";

interface IBurgerListIngredientProps {
    data: TIngredient;
    ingredientAmount: number;
}

const BurgerListIngredient: FC<IBurgerListIngredientProps> = ({data, ingredientAmount}) => {
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const opacity = isDrag ? 0.1 : 1;

    return (
        <div ref={dragRef} className={styles.ingredient + ' ml-4 mb-10 mt-6'} style={{opacity}}>
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
            <Counter count={ingredientAmount ? ingredientAmount : 0} size="default" />
        </div>
    );
};

export default BurgerListIngredient;