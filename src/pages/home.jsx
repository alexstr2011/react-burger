import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './home.module.css';
import {burgerIngredientsLoad} from '../services/actions/actions';

function HomePage() {
    const { isLoading, isError, data } = useSelector(store => store.burgerIngredientsReducer);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(burgerIngredientsLoad());
    }, [dispatch]);

    return (
        <>
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
        </>
    );
}

export default HomePage;

