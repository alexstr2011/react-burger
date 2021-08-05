import React, {FC} from 'react';
import { useSelector, useDispatch } from '../services/types/types';
import {Redirect} from 'react-router-dom';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css';
import {updateUser} from "../services/actions/user-actions";
import ProfileMenu from "../components/profile-menu/profile-menu";

const ProfilePage: FC = () => {
    const user = useSelector(store => store.userReducer.user);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        if (user && user.name) {
            setEmail(user?.email || '');
            setName(user.name);
        }
    }, [user]);

    const dispatch = useDispatch();

    const updateHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(email, password, name));
    };

    const clearHandler = () => {
        setEmail(user?.email || '');
        setName(user?.name || '');
    };

    const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        (user && user.name) ? (
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
                <ProfileMenu/>
            </div>
        ) : (
            <p>Loading...</p>
        )
    );
};

export default ProfilePage;