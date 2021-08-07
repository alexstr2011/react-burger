import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import { Logo,BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

const AppHeader: FC = () => {
    return (
        <header className={styles.header + ' m-10'}>
            <div className={styles.wrapper + ' m-5'}>
                <nav className={styles.flexContainer}>
                    <NavLink exact to='/'
                             className={styles.link}
                             activeClassName={styles.linkActive}>
                        <BurgerIcon type="secondary"/>
                        <p className="text text_type_main-default ml-2 mr-2">
                            Конструктор
                        </p>
                    </NavLink>
                    <NavLink to='/feed'
                             className={styles.link}
                             activeClassName={styles.linkActive}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default ml-2">
                            Лента заказов
                        </p>
                    </NavLink>
                </nav>
                <NavLink exact to='/'
                         className={styles.link}>
                    <Logo />
                </NavLink>
                <nav>
                    <NavLink to='/profile'
                             className={`${styles.link}  ${styles.profile}`}
                             activeClassName={styles.linkActive}>
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