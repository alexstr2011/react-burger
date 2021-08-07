import {CREATE_ORDER_URL, INGREDIENTS_URL, TOKEN_URL} from '../api/urls';
import {getCookie, setCookie} from "../../utils/cookies";
import {AppDispatch, AppThunk, TIngredient, TApplicationActions, TConstructorIngredient} from "../types/types";

export const BURGER_INGREDIENTS = {
    LOAD: 'BURGER_INGREDIENTS/LOAD' as 'BURGER_INGREDIENTS/LOAD',
    LOAD_SUCCESS: 'BURGER_INGREDIENTS/LOAD_SUCCESS' as 'BURGER_INGREDIENTS/LOAD_SUCCESS',
    LOAD_FAILED: 'BURGER_INGREDIENTS/LOAD_FAILED' as 'BURGER_INGREDIENTS/LOAD_FAILED'
};

export interface IBurgerIngredientsLoadAction {
    readonly type: typeof BURGER_INGREDIENTS.LOAD;
}

export interface IBurgerIngredientsLoadSuccessAction {
    readonly type: typeof BURGER_INGREDIENTS.LOAD_SUCCESS;
    readonly data: ReadonlyArray<TIngredient>;
}

export interface IBurgerIngredientsLoadFailedAction {
    readonly type: typeof BURGER_INGREDIENTS.LOAD_FAILED;
}

export type TBurgerIngredientsActions =
    IBurgerIngredientsLoadAction
    | IBurgerIngredientsLoadSuccessAction
    | IBurgerIngredientsLoadFailedAction;

export const burgerIngredientsLoad: AppThunk = () => {
    return function(dispatch: AppDispatch): void {
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
    ADD: 'BURGER_CONSTRUCTOR/ADD' as 'BURGER_CONSTRUCTOR/ADD',
    REMOVE: 'BURGER_CONSTRUCTOR/REMOVE' as 'BURGER_CONSTRUCTOR/REMOVE',
    REMOVE_ALL: 'BURGER_CONSTRUCTOR/REMOVE_ALL' as 'BURGER_CONSTRUCTOR/REMOVE_ALL',
    MOVE: 'BURGER_CONSTRUCTOR/MOVE' as 'BURGER_CONSTRUCTOR/MOVE'
};

export interface IBurgerConstructorAddAction {
    readonly type: typeof BURGER_CONSTRUCTOR.ADD;
    readonly ingredient: TIngredient;
    readonly localId: number;
}

export interface IBurgerConstructorRemoveAction {
    readonly type: typeof BURGER_CONSTRUCTOR.REMOVE;
    readonly ingredient: TIngredient;
    readonly index: number;
}

export interface IBurgerConstructorRemoveAllAction {
    readonly type: typeof BURGER_CONSTRUCTOR.REMOVE_ALL;
}

export interface IBurgerConstructorMoveAction {
    readonly type: typeof BURGER_CONSTRUCTOR.MOVE;
    readonly indexTo: number;
    readonly indexFrom: number;
}

export type TBurgerConstructorActions =
    IBurgerConstructorAddAction
    | IBurgerConstructorRemoveAction
    | IBurgerConstructorRemoveAllAction
    | IBurgerConstructorMoveAction;

export const ORDER_NUMBER = {
    LOAD: 'ORDER_NUMBER/LOAD' as 'ORDER_NUMBER/LOAD',
    LOAD_SUCCESS: 'ORDER_NUMBER/LOAD_SUCCESS' as 'ORDER_NUMBER/LOAD_SUCCESS',
    LOAD_FAILED: 'ORDER_NUMBER/LOAD_FAILED' as 'ORDER_NUMBER/LOAD_FAILED',
    DELETE: 'ORDER_NUMBER/DELETE' as 'ORDER_NUMBER/DELETE'
};

export interface IOrderNumberLoadAction {
    readonly type: typeof ORDER_NUMBER.LOAD;
}

export interface IOrderNumberLoadSuccessAction {
    readonly type: typeof ORDER_NUMBER.LOAD_SUCCESS;
    readonly number: string;
}

export interface IOrderNumberLoadFailedAction {
    readonly type: typeof ORDER_NUMBER.LOAD_FAILED;
}

export interface IOrderNumberDeleteAction {
    readonly type: typeof ORDER_NUMBER.DELETE;
}

export type TOrderNumberActions =
    IOrderNumberLoadAction
    | IOrderNumberLoadSuccessAction
    | IOrderNumberLoadFailedAction
    | IOrderNumberDeleteAction;

export const refreshToken: AppThunk = (afterRefresh: TApplicationActions) => {
    return function(dispatch: AppDispatch): void {
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

export const orderNumberLoad: AppThunk = (ingredients: ReadonlyArray<TConstructorIngredient>) => {
    return function(dispatch: AppDispatch | AppThunk): void {
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
