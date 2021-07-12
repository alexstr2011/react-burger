import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import {login} from "../services/actions/user-actions";
import styles from './login.module.css';

function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const user = useSelector(store => store.userReducer.user);

    const dispatch = useDispatch();

    const loginHandler = React.useCallback(
        (e) => {
            e.preventDefault();
            dispatch(login(email, password));
        }, [dispatch, email, password]);

    const location = useLocation();

    const changeEmailHandler = React.useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    const changePasswordHandler = React.useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    if (user && user.name) {
        return (
            <Redirect
                to={ location?.state?.from || '/' }
            />
        );
    }

    return (
        <section className={styles.wrapper}>
            <form onSubmit={loginHandler} className={styles.form}>
                <p className='text text_type_main-medium mb-6'>
                    Вход
                </p>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <EmailInput
                        name={'email'}
                        value={email}
                        onChange={changeEmailHandler}/>
                </div>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <PasswordInput
                        name={'password'}
                        value={password}
                        onChange={changePasswordHandler}/>
                </div>
                <div className='mb-20'>
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </div>
            </form>
            <section className={styles.textRow + ' mb-4'}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Вы - новый пользователь?
                </p>
                <Link to='/register' className={styles.link}>
                    <p className='text text_type_main-default'>
                        Зарегистрироваться
                    </p>
                </Link>
            </section>
            <section className={styles.textRow}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Забыли пароль?
                </p>
                <Link to='/forgot-password' className={styles.link}>
                    <p className='text text_type_main-default'>
                        Восстановить пароль
                    </p>
                </Link>
            </section>
        </section>
    );
}

export default LoginPage;