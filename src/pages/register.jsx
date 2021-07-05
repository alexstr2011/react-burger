import React from 'react';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import {Link} from "react-router-dom";
import {registerUser} from '../services/api/api';

function RegisterPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const registerHandler = React.useCallback(
        () => {
            registerUser(email, password, name);
        }, [email, password, name]);

    const changeEmailHandler = React.useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail]);

    const changePasswordHandler = React.useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword]);

    const changeNameHandler = React.useCallback((e) => {
        setName(e.target.value);
    }, [setName]);

    return (
        <section className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>
                Регистрация
            </p>
            <div className={styles.inputWrapper + ' mb-6'}>
                <Input
                    name={'name'}
                    type='text'
                    value={name}
                    onChange={changeNameHandler}
                    placeholder='Имя' />
            </div>
            <div className={styles.inputWrapper + ' mb-6'}>
                <EmailInput
                    name={'email'}
                    value={email}
                    onChange={changeEmailHandler} />
            </div>
            <div className={styles.inputWrapper + ' mb-6'}>
                <PasswordInput
                    name={'password'}
                    value={password}
                    onChange={changePasswordHandler} />
            </div>
            <div className='mb-20'>
                <Button type="primary" size="medium" onClick={registerHandler} >
                    Зарегистрироваться
                </Button>
            </div>
            <section className={styles.textRow + ' mb-4'}>
                <p className="text text_type_main-default text_color_inactive mr-2">
                    Уже зарегистрированы?
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

export default RegisterPage;