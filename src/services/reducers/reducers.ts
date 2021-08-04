import { combineReducers } from 'redux';
import {
    BURGER_CONSTRUCTOR,
    BURGER_INGREDIENTS, IBurgerConstructorAddAction, IBurgerConstructorMoveAction, IBurgerConstructorRemoveAction,
    IBurgerIngredientsLoadSuccessAction, IOrderNumberLoadSuccessAction,
    ORDER_NUMBER, TBurgerConstructorActions,
    TBurgerIngredientsActions, TOrderNumberActions
} from '../actions/actions';
import { userReducer } from './user-reducer';
import { passwordReducer } from './password-reducer';
import { allOrdersReducer, userOrdersReducer } from './orders-reducer';
import {TConstructorIngredient, TIngredient} from "../types/types";

type TIngredientTypesState = ReadonlyArray<{
    readonly type: string,
    readonly name: string
}>;

const ingredientTypesInitialState: TIngredientTypesState = [
    {
        type: 'bun',
        name: 'Булки'
    },
    {
        type: 'sauce',
        name: 'Соусы'
    },
    {
        type: 'main',
        name: 'Начинки'
    }
];

export const ingredientTypesReducer =
    (state = ingredientTypesInitialState): TIngredientTypesState=> {

    return state;
};

type TBurgerIngredientsState = {
    readonly data: ReadonlyArray<TIngredient>;
    readonly isLoading: boolean;
    readonly isError: boolean;
};

const burgerIngredientsInitialState: TBurgerIngredientsState = {
    data: [],
    isLoading: false,
    isError: false
};

export const burgerIngredientsReducer = (state = burgerIngredientsInitialState,
                                         action: TBurgerIngredientsActions) => {
    switch(action.type) {
        case BURGER_INGREDIENTS.LOAD:
            return {...state, data: [], isLoading: true, isError: false}
        case BURGER_INGREDIENTS.LOAD_FAILED:
            return {...state, isLoading: false, isError: true}
        case BURGER_INGREDIENTS.LOAD_SUCCESS:
            return {
                ...state,
                data: (action as IBurgerIngredientsLoadSuccessAction).data,
                isLoading: false,
                isError: false
            }
        default:
            return state;
    }
}

type TBurgerConstructorState = {
    readonly bun: null | TConstructorIngredient;
    readonly inners: ReadonlyArray<TConstructorIngredient>;
};

const burgerConstructorInitialState: TBurgerConstructorState = {
    bun: null,
    inners: []
};

export const burgerConstructorReducer = (state = burgerConstructorInitialState,
                                         action: TBurgerConstructorActions) => {
    switch(action.type) {
        case BURGER_CONSTRUCTOR.ADD: {
            const key = (action as IBurgerConstructorAddAction).ingredient._id
                + (action as IBurgerConstructorAddAction).localId;
            const newIngredient = { ...(action as IBurgerConstructorAddAction).ingredient, key }
            if ((action as IBurgerConstructorAddAction).ingredient.type === 'bun') {
                return { ...state, bun: newIngredient }
            } else {
                return { ...state, inners: [...state.inners, newIngredient]}
            }
        }
        case BURGER_CONSTRUCTOR.REMOVE:
            if ((action as IBurgerConstructorRemoveAction).ingredient.type === 'bun') {
                    return state;
            } else {
                return {
                    ...state,
                    inners: [
                        ...state.inners.slice(0, (action as IBurgerConstructorRemoveAction).index),
                        ...state.inners.slice((action as IBurgerConstructorRemoveAction).index + 1)
                    ]
                };
            }
        case BURGER_CONSTRUCTOR.REMOVE_ALL:
            return burgerConstructorInitialState;
        case BURGER_CONSTRUCTOR.MOVE: {
            const indexTo =
                (action as IBurgerConstructorMoveAction).indexTo > (action as IBurgerConstructorMoveAction).indexFrom
                    ? (action as IBurgerConstructorMoveAction).indexTo - 1
                    : (action as IBurgerConstructorMoveAction).indexTo;
            const newInners = state.inners.filter(
                (_,index) =>
                    index !== (action as IBurgerConstructorMoveAction).indexFrom);
            return {
                ...state,
                inners: [...newInners.slice(0, indexTo),
                    state.inners[(action as IBurgerConstructorMoveAction).indexFrom],
                    ...newInners.slice(indexTo)]
            };
        }
        default:
            return state;
    }
}

type TOrderNumberInitialState = {
    readonly number: null | string;
    readonly isLoading: boolean;
    readonly isError: boolean;
};

const orderNumberInitialState: TOrderNumberInitialState = {
    number: null,
    isLoading: false,
    isError: false
};

export const orderNumberReducer = (state = orderNumberInitialState,
                                   action: TOrderNumberActions) => {
    switch(action.type) {
        case ORDER_NUMBER.LOAD:
            return {...state, number: null, isLoading: true, isError: false}
        case ORDER_NUMBER.LOAD_FAILED:
            return {...state, isLoading: false, isError: true}
        case ORDER_NUMBER.LOAD_SUCCESS:
            return {
                ...state,
                number: (action as IOrderNumberLoadSuccessAction).number,
                isLoading: false,
                isError: false
            }
        case ORDER_NUMBER.DELETE:
            return orderNumberInitialState;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    ingredientTypesReducer,
    burgerIngredientsReducer,
    burgerConstructorReducer,
    orderNumberReducer,
    userReducer,
    passwordReducer,
    allOrdersReducer,
    userOrdersReducer
});
