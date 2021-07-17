import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css';
import {logout, updateUser} from "../services/actions/user-actions";

function ProfilePage() {
    const user = useSelector(store => store.userReducer.user);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        if (user && user.name) {
            setEmail(user.email);
            setName(user.name);
        }
    }, [user]);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    const updateHandler = e => {
        e.preventDefault();
        dispatch(updateUser(email, password, name));
    };

    const clearHandler = () => {
        setEmail(user.email);
        setName(user.name);
    };

    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    };

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const changeNameHandler = (e) => {
        setName(e.target.value);
    };

    if (!user || !user.name) {
        return (
            <Redirect
                to={{ pathname: '/login' }}
            />
        );
    }

    return (
        user && user.name &&
        <div className={styles.positioning}>
            <form onSubmit={updateHandler} className={styles.wrapper}>
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
                <div className={styles.buttonsRow}>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                    <Button onClick={clearHandler} type="primary" size="medium">
                        Отменить
                    </Button>
                </div>
            </form>
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