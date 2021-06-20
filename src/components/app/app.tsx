import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { burgerIngredientsLoad } from '../../services/actions/actions';
import {BURGER_CONSTRUCTOR} from '../../services/actions/actions';

function App() {
    // @ts-ignore
    const { isLoading, isError, data } = useSelector(store => store.burgerIngredients);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(burgerIngredientsLoad());
    }, [dispatch]);

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // @ts-ignore
    data.filter((item,index) => index%2 !== 0).forEach(item => dispatch({
        type: BURGER_CONSTRUCTOR.ADD,
        ingredient: item
    }));
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    return (
        <div className={styles.app}>
            <AppHeader/>
            {isLoading && <p className={styles.info}>Loading...</p>}
            {isError && <p className={styles.error}>Failed getting data from server</p>}
            {!isLoading && !isError && !!data.length &&
            <main className={styles.main}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </main>
            }
        </div>
    );
}

export default App;
