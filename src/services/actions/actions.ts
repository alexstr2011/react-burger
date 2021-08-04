import {CREATE_ORDER_URL, INGREDIENTS_URL, TOKEN_URL} from '../api/urls';
import {getCookie, setCookie} from "../../utils/cookies";

export const BURGER_INGREDIENTS = {
    LOAD: 'BURGER_INGREDIENTS/LOAD',
    LOAD_SUCCESS: 'BURGER_INGREDIENTS/LOAD_SUCCESS',
    LOAD_FAILED: 'BURGER_INGREDIENTS/LOAD_FAILED'
};

export function burgerIngredientsLoad(): void {
    return function(dispatch): void {
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
    REMOVE_ALL: 'BURGER_CONSTRUCTOR/REMOVE_ALL',
    MOVE: 'BURGER_CONSTRUCTOR/MOVE'
};

export const ORDER_NUMBER = {
    LOAD: 'ORDER_NUMBER/LOAD',
    LOAD_SUCCESS: 'ORDER_NUMBER/LOAD_SUCCESS',
    LOAD_FAILED: 'ORDER_NUMBER/LOAD_FAILED',
    DELETE: 'ORDER_NUMBER/DELETE'
};

export function refreshToken(afterRefresh) {
    return function(dispatch) {
        fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: localStorage.getItem('refreshToken')})
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed to login');
                }
                const { accessToken, refreshToken } = response;
                setCookie('accessToken', accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', refreshToken);

                dispatch(afterRefresh);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
}

export function orderNumberLoad(ingredients) {
    return function(dispatch) {
        dispatch({
            type: ORDER_NUMBER.LOAD
        });
        fetch(CREATE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({'ingredients': ingredients})
        }).then((response) => {
            return response.json();
        })
            .then((response) => {
                if (!response.success) {
                    throw response;
                }
                dispatch({
                    type: ORDER_NUMBER.LOAD_SUCCESS,
                    number: response.order.number
                });
            })
            .catch((error) => {
                if (error.message === 'jwt expired') {
                    dispatch(refreshToken(orderNumberLoad(ingredients)));
                }

                console.log(error.message);
                dispatch({
                    type: ORDER_NUMBER.LOAD_FAILED
                });
            });
    }
}