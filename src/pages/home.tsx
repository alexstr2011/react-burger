import React, {FC} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './home.module.css';

const HomePage: FC = () => {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </>
    );
};

export default HomePage;

