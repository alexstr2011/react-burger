import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { burgerIngredientsLoad } from '../../services/actions/actions';

function App() {
    // @ts-ignore
    const { isLoading, isError, data } = useSelector(store => store.burgerIngredients);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(burgerIngredientsLoad());
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <AppHeader/>
            {isLoading && <p className={styles.info}>Loading...</p>}
            {isError && <p className={styles.error}>Failed getting data from server</p>}
            <DndProvider backend={HTML5Backend}>
                {!isLoading && !isError && !!data.length &&
                <main className={styles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
                }
            </DndProvider>
        </div>
    );
}

export default App;
