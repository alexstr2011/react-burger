import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-info.module.css';
import picture from '../../images/checkMark.png';

function OrderInfo() {
    return (
        <section className={styles.wrapper}>
            <p className={"text text_type_digits-default mb-10 " + styles.number}>#034533</p>
            <p className="text text_type_main-medium mb-3">
                Black Hole Singularity острый бургер
            </p>
            <p className={"text text_type_main-default mb-15 " + styles.status}>
                Выполнен
            </p>
            <p className="text text_type_main-medium mb-6">
                Состав:
            </p>
            <ul className={styles.list + ' scrollbar'}>
                <li className={styles.row}>
                    <img className={styles.picture} src={picture} alt='ingredient'/>
                    <p className={"text text_type_main-default ml-4 mr-4 " + styles.ingredient}>
                        Флюоресцентная булка R2-D3
                    </p>
                    <p className="text text_type_digits-default mr-2">2 x 20</p>
                    <CurrencyIcon type="primary"/>
                </li>
                <li className={styles.row}>
                    <img className={styles.picture} src={picture} alt='ingredient'/>
                    <p className={"text text_type_main-default ml-4 mr-4 " + styles.ingredient}>
                        Флюоресцентная булка R2-D3
                    </p>
                    <p className="text text_type_digits-default mr-2">2 x 20</p>
                    <CurrencyIcon type="primary"/>
                </li>
                <li className={styles.row}>
                    <img className={styles.picture} src={picture} alt='ingredient'/>
                    <p className={"text text_type_main-default ml-4 mr-4 " + styles.ingredient}>
                        Флюоресцентная булка R2-D3
                    </p>
                    <p className="text text_type_digits-default mr-2">2 x 20</p>
                    <CurrencyIcon type="primary"/>
                </li>
                <li className={styles.row}>
                    <img className={styles.picture} src={picture} alt='ingredient'/>
                    <p className={"text text_type_main-default ml-4 mr-4 " + styles.ingredient}>
                        Флюоресцентная булка R2-D3
                    </p>
                    <p className="text text_type_digits-default mr-2">2 x 20</p>
                    <CurrencyIcon type="primary"/>
                </li>
                <li className={styles.row}>
                    <img className={styles.picture} src={picture} alt='ingredient'/>
                    <p className={"text text_type_main-default ml-4 mr-4 " + styles.ingredient}>
                        Флюоресцентная булка R2-D3
                    </p>
                    <p className="text text_type_digits-default mr-2">2 x 20</p>
                    <CurrencyIcon type="primary"/>
                </li>
            </ul>
            <div className={styles.row + ' mt-10'}>
                <p className="text text_type_main-default text_color_inactive">
                    Вчера, 13:50 i-GMT+3
                </p>
                <p className={"text text_type_digits-default mr-2 " + styles.toTheRight}>510</p>
                <CurrencyIcon type="primary"/>
            </div>
        </section>
    );
}

export default OrderInfo;