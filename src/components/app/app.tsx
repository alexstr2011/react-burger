import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'

import {data, ingredientTypes} from '../../utils/data';

function App() {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients data={data} ingredientTypes={ingredientTypes} />
                <BurgerConstructor data={data} />
            </main>
        </div>
    );
}

export default App;
