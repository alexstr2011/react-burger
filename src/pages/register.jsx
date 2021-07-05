import React from 'react';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import {Link} from "react-router-dom";

function RegisterPage() {
    return (
        <section className={styles.wrapper}>
            <p className='text text_type_main-medium mb-6'>
                Регистрация
            </p>
            <div className={styles.inputWrapper + ' mb-6'}>
                <Input name={'email'} type='text' placeholder='Имя' />
            </div>
            <div className={styles.inputWrapper + ' mb-6'}>
                <EmailInput name={'email'} />
            </div>
            <div className={styles.inputWrapper + ' mb-6'}>
                <PasswordInput name={'password'} />
            </div>
            <div className='mb-20'>
                <Button type="primary" size="medium" >
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