import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-element.module.css';
import picture from '../../images/checkMark.png';

function OrderElement() {
    return (
        <section className={styles.wrapper + ' ' + styles.history + ' p-6'}>
            <div className={styles.row + ' ' + styles.rowFar}>
                <p className="text text_type_digits-default">
                    #034535
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Сегодня, 16:20 i-GMT+3
                </p>
            </div>
            <p className="text text_type_main-medium mt-6 mb-2">
                Death Star Starship Main бургер
            </p>
            <p className="text text_type_main-default mb-6">
                Создан
            </p>
            <div className={styles.row + ' ' + styles.rowFar}>
                <ul className={styles.picturesList + ' ' + styles.row}>
                    <li>
                        <img className={styles.picture} src={picture} alt='ingredient' />
                    </li>
                    <li>
                        <img className={styles.picture} src={picture} alt='ingredient' />
                    </li>
                    <li>
                        <img className={styles.picture} src={picture} alt='ingredient' />
                    </li>
                    <li>
                        <img className={styles.picture} src={picture} alt='ingredient' />
                    </li>
                    <li>
                        <img className={styles.picture} src={picture} alt='ingredient' />
                    </li>
                </ul>
                <div className={styles.row}>
                    <p className="text text_type_digits-default mr-2">
                        480
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    );
}

export default OrderElement;