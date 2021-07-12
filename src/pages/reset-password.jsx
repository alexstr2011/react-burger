import React from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';
import {Link, Redirect, useLocation} from "react-router-dom";
import {resetPassword} from '../services/actions/user-actions';
import {useDispatch, useSelector} from "react-redux";

function ResetPasswordPage() {
    const {isForgotPassword, isResetPassword} = useSelector(store => store.userReducer);
    const location = useLocation();

    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    const dispatch = useDispatch();
    const restoreHandler = React.useCallback(
        (e) => {
            e.preventDefault();
            dispatch(resetPassword(password, token));
        }, [password, token]);

    const changePasswordHandler = React.useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    const changeTokenHandler = React.useCallback((e) => {
        setToken(e.target.value);
    }, [setToken]);

    if (isResetPassword || !isForgotPassword) {
        return (
            <Redirect
                to={{
                    pathname: isResetPassword ? '/login' : '/forgot-password',
                    state: {from: location}
                }}
            />
        );
    }

    return (
        <section className={styles.wrapper}>
            <form onSubmit={restoreHandler} className={styles.form}>
                <p className='text text_type_main-medium mb-6'>
                    Восстановление пароля
                </p>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <PasswordInput
                        name={'password'}
                        value={password}
                        onChange={changePasswordHandler}
                        placeholder='Введите новый пароль'/>
                </div>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <Input
                        name={'name'}
                        type='text'
                        value={token}
                        onChange={changeTokenHandler}
                        placeholder='Введите код из письма'/>
                </div>
                <div className='mb-20'>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            </form>
            <section className={styles.textRow + ' mb-4'}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Вспомнили пароль?
                </p>
                <Link to='/login' className={styles.link}>
                    <p className='text text_type_main-default'>
                        Войти
                    </p>
                </Link>
            </section>
        </section>
    );
}

export default ResetPasswordPage;