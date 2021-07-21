import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./profile-menu.module.css";
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/user-actions";

function ProfileMenu() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <section className={styles.menu}>
            <nav>
                <ul className={styles.menuList}>
                    <li>
                        <NavLink to='/profile'
                                 className={styles.menuItemLink}
                                 activeClassName={styles.menuActiveItemLink}
                        >
                            <p className={styles.menuItem + " text text_type_main-medium"}>
                                Профиль
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile/orders'
                                 className={styles.menuItemLink}
                                 activeClassName={styles.menuActiveItemLink}
                        >
                            <p className={styles.menuItem + " text text_type_main-medium"}>
                                История заказов
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <p onClick={logoutHandler}
                           className={styles.menuItem
                           + ' ' + styles.menuItemLink
                           + " text text_type_main-medium"}>
                            Выход
                        </p>
                    </li>
                </ul>
            </nav>
            <p className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете<br/>изменить свои персональные данные
            </p>
        </section>
    );
}

export default ProfileMenu;