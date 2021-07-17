import React from 'react';
import {Link, Redirect, useLocation} from "react-router-dom";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { forgotPassword } from '../services/actions/password-actions';
import styles from './forgot-password.module.css';
import {useDispatch, useSelector} from 'react-redux';

function ForgotPasswordPage() {
    const isForgotPassword = useSelector(store => store.passwordReducer.isForgot);
    const location = useLocation();
    const [email, setEmail] = React.useState('');

    const dispatch = useDispatch();
    const restoreHandler = React.useCallback(
        (e) => {
            e.preventDefault();
            if (!email) {
                return;
            }

            dispatch(forgotPassword(email));
        }, [email, dispatch]);

    const changeEmailHandler = React.useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    if (isForgotPassword) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password',
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
                    <EmailInput name={'email'} value={email} onChange={changeEmailHandler}/>
                </div>
                <div className='mb-20'>
                    <Button type="primary" size="medium">
                        Восстановить
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

export default ForgotPasswordPage;