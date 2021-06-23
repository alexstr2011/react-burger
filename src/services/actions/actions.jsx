import {CREATE_ORDER_URL, INGREDIENTS_URL} from '../api/urls';

export const BURGER_INGREDIENTS = {
    LOAD: 'BURGER_INGREDIENTS/LOAD',
    LOAD_SUCCESS: 'BURGER_INGREDIENTS/LOAD_SUCCESS',
    LOAD_FAILED: 'BURGER_INGREDIENTS/LOAD_FAILED'
}

export function burgerIngredientsLoad() {
    return function(dispatch) {
        dispatch({
            type: BURGER_INGREDIENTS.LOAD
        });

        fetch(INGREDIENTS_URL).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                dispatch({
                    type: BURGER_INGREDIENTS.LOAD_SUCCESS,
                    data: response.data
                });
            })
            .catch((error) => {
                console.log(error.message);
                dispatch({
                    type: BURGER_INGREDIENTS.LOAD_FAILED
                })
            });
    }
}

export const BURGER_CONSTRUCTOR = {
    ADD: 'BURGER_CONSTRUCTOR/ADD',
    REMOVE: 'BURGER_CONSTRUCTOR/REMOVE',
    MOVE: 'BURGER_CONSTRUCTOR/MOVE'
}

export const MODAL_INGREDIENT = {
    SET: 'MODAL_INGREDIENT/SET',
    UNSET: 'MODAL_INGREDIENT/UNSET'
}

export const ORDER_NUMBER = {
    LOAD: 'ORDER_NUMBER/LOAD',
    LOAD_SUCCESS: 'ORDER_NUMBER/LOAD_SUCCESS',
    LOAD_FAILED: 'ORDER_NUMBER/LOAD_FAILED',
    DELETE: 'ORDER_NUMBER/DELETE'
}

export function orderNumberLoad(ingredients) {
    return function(dispatch) {
        dispatch({
            type: ORDER_NUMBER.LOAD
        });
        fetch(CREATE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'ingredients': ingredients})
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed creating order');
                }
                dispatch({
                    type: ORDER_NUMBER.LOAD_SUCCESS,
                    number: response.order.number
                });
            })
            .catch((error) => {
                console.log(error.message);
                dispatch({
                    type: ORDER_NUMBER.LOAD_FAILED
                });
            });
    }
}