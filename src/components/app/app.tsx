import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css'

import { ingredientTypes } from '../../utils/data';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        // @ts-ignore
        const getData = (url) => {
            fetch(url).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed getting data from server');
                }
            })
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setData([]);
                    setError(true);
                    setLoading(false);
                });
        };

        setData([]);
        setLoading(true);
        setError(false);

        getData(API_URL);

    }, []);

    return (
        <div className={styles.app}>
            <AppHeader/>
            {loading && <p className={styles.info}>Loading...</p>}
            {error && <p className={styles.error}>Failed getting data from server</p>}
            {!loading && !error && !!data.length &&
            <main className={styles.main}>
                <BurgerIngredients data={data} ingredientTypes={ingredientTypes}/>
                <BurgerConstructor data={data}/>
            </main>
            }
        </div>
    );
}

export default App;
