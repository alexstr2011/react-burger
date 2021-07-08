import React from 'react';
import {NavLink} from 'react-router-dom';
import { Logo,BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={styles.header + ' m-10'}>
            <div className={styles.wrapper + ' m-5'}>
                <nav className={styles.flexContainer}>
                    <BurgerIcon type="primary"/>
                    <p className="text text_type_main-default ml-2 mr-2">
                        Конструктор
                    </p>
                    <ListIcon type="secondary"/>
                    <p className="text text_type_main-default ml-2">
                        Лента заказов
                    </p>
                </nav>
                <Logo />
                <nav>
                    <NavLink to='/profile' className={styles.profile}>
                        <ProfileIcon type="secondary"/>
                        <p className="text text_type_main-default ml-2">
                            Личный кабинет
                        </p>
                    </NavLink>
                </nav>
            </div>
        </header>

    );
}

export default AppHeader;