import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css';
import {logout} from "../services/actions/user-actions";

function ProfilePage() {
    const [email, setEmail] = React.useState('mail@stellar.burgers');
    const [password, setPassword] = React.useState('1111111');
    const [name, setName] = React.useState('Марк');

    const user = useSelector(store => store.userReducer.user);

    const dispatch = useDispatch();

    const logoutHandler = React.useCallback(
        () => {
            dispatch(logout());
        }, [dispatch]);

    const changeEmailHandler = React.useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    const changePasswordHandler = React.useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    const changeNameHandler = React.useCallback((e) => {
        setName(e.target.value);
    }, [setName]);

    if (!user || !user.name) {
        return (
            <Redirect
                to={{ pathname: '/login' }}
            />
        );
    }

    return (
        <div className={styles.positioning}>
            <section className={styles.wrapper}>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <Input
                        name={'name'}
                        type='text'
                        value={name}
                        onChange={changeNameHandler}
                        placeholder='Имя'
                        icon='EditIcon'
                    />
                </div>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <Input
                        name={'email'}
                        type='email'
                        value={email}
                        onChange={changeEmailHandler}
                        placeholder='E-mail'
                        icon='EditIcon'
                    />
                </div>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <Input
                        name={'password'}
                        type='password'
                        value={password}
                        onChange={changePasswordHandler}
                        placeholder='Пароль'
                        icon='EditIcon'
                    />
                </div>
            </section>
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
        </div>
    );
}

export default ProfilePage;