import React from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';

function LoginPage() {
    return (
        <section className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>
                Вход
            </p>
            <div className={styles.inputWrapper + ' mb-6'}>
                <EmailInput name={'email'} />
            </div>
            <div className={styles.inputWrapper + ' mb-6'}>
                <PasswordInput name={'password'} />
            </div>
            <div className='mb-20'>
                <Button type="primary" size="medium" >
                    Войти
                </Button>
            </div>
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