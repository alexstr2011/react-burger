import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { Context } from '../../context/context';
import { ingredientTypes } from '../../utils/data';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

//actions
const START_LOAD = 'START_LOAD';
const LOAD_OK = 'LOAD_OK';
const LOAD_ERR = 'LOAD_ERR';

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    error: ''
};

// @ts-ignore
function reducer(state, action) {
    switch (action.type) {
        case START_LOAD:
            return {
                ...state,
                data: [],
                isLoading: true,
                isError: false
            };
        case LOAD_OK:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            };
        case LOAD_ERR:
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                error: action.payload
            };
        default:
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                error: `Wrong type of action: ${action.type}`
            };
    }
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

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
                    dispatch({
                        type: LOAD_OK,
                        payload: response.data
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: LOAD_ERR,
                        payload: 'Failed getting data from server: ' + error.message
                    })
                });
        };

        dispatch({
            type: START_LOAD
        });

        getData(API_URL);

    }, []);

    const burgerConstructorData = {
        // @ts-ignore
        bun: state.data.filter(item => item.type === 'bun')[0],
        // @ts-ignore
        inners: state.data.filter(item => item.type !== 'bun')
    };

    return (
        <div className={styles.app}>
            <AppHeader/>
            {state.isLoading && <p className={styles.info}>Loading...</p>}
            {state.isError && <p className={styles.error}>{state.error}</p>}
            {!state.isLoading && !state.isError && !!state.data.length &&
            <main className={styles.main}>
                <BurgerIngredients data={state.data} ingredientTypes={ingredientTypes}/>
                <Context.Provider value={burgerConstructorData}>
                    <BurgerConstructor />
                </Context.Provider>
            </main>
            }
        </div>
    );
}

export default App;
