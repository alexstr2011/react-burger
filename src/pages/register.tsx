import React, {FC} from 'react';
import { useDispatch } from '../services/types/types';
import {Link} from "react-router-dom";
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { register } from '../services/actions/user-actions';
import styles from './register.module.css';

const RegisterPage: FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const dispatch = useDispatch();

    const registerHandler = React.useCallback(
        (e) => {
            e.preventDefault();
            dispatch(register(email, password, name));
        }, [dispatch, email, password, name]);

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
            <form onSubmit={registerHandler} className={styles.form}>
                <p className='text text_type_main-medium mb-6'>
                    Регистрация
                </p>
                <div className={styles.inputWrapper + ' mb-6'}>
                    <Input
                        name={'name'}
                        type='text'
                        value={name}
                        onChange={changeNameHandler}
                        placeholder='Имя'/>
                </div>
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
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
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