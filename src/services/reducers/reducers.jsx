import { combineReducers } from 'redux';
import {BURGER_CONSTRUCTOR, BURGER_INGREDIENTS, MODAL_INGREDIENT, ORDER_NUMBER} from '../actions/actions';

const ingredientTypesInitialState = [
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

const ingredientTypes = (state = ingredientTypesInitialState) => {
    return state;
};

const burgerIngredientsInitialState = {
    data: [],
    isLoading: false,
    isError: false
};

const burgerIngredients = (state = burgerIngredientsInitialState, action) => {
    switch(action.type) {
        case BURGER_INGREDIENTS.LOAD:
            return {...state, data: [], isLoading: true, isError: false}
        case BURGER_INGREDIENTS.LOAD_FAILED:
            return {...state, isLoading: false, isError: true}
        case BURGER_INGREDIENTS.LOAD_SUCCESS:
            return {...state, data: action.data, isLoading: false, isError: false}
        default:
            return state;
    }
}

const burgerConstructorInitialState = {
    bun: null,
    inners: []
};

const burgerConstructor = (state = burgerConstructorInitialState, action) => {
    switch(action.type) {
        case BURGER_CONSTRUCTOR.ADD: {
            const key = action.ingredient._id + action.localId;
            const newIngredient = { ...action.ingredient, key }
            if (action.ingredient.type === 'bun') {
                return { ...state, bun: newIngredient }
            } else {
                return { ...state, inners: [...state.inners, newIngredient]}
            }
        }
        case BURGER_CONSTRUCTOR.REMOVE:
            if (action.ingredient.type === 'bun') {
                    return state;
            } else {
                return {
                    ...state,
                    inners: [...state.inners.slice(0, action.index), ...state.inners.slice(action.index + 1)]
                };
            }
        case BURGER_CONSTRUCTOR.REMOVE_ALL:
            return burgerConstructorInitialState;
        case BURGER_CONSTRUCTOR.MOVE: {
            const indexTo = action.indexTo > action.indexFrom ? action.indexTo - 1 : action.indexTo;
            const newInners = state.inners.filter((_,index) => index !== action.indexFrom);
            return {
                ...state,
                inners: [...newInners.slice(0, indexTo),
                    state.inners[action.indexFrom],
                    ...newInners.slice(indexTo)]
            };
        }
        default:
            return state;
    }
}

const modalIngredientInitialState = {
    ingredient: null
};

const modalIngredient = (state = modalIngredientInitialState, action) => {
    switch (action.type) {
        case MODAL_INGREDIENT.SET:
            return {...state, ingredient: action.data};
        case MODAL_INGREDIENT.UNSET:
            return {...state, ingredient: null};
        default:
            return state;
    }
}

const orderNumberInitialState = {
    number: null,
    isLoading: false,
    isError: false
};

const orderNumber = (state = orderNumberInitialState, action) => {
    switch(action.type) {
        case ORDER_NUMBER.LOAD:
            return {...state, number: null, isLoading: true, isError: false}
        case ORDER_NUMBER.LOAD_FAILED:
            return {...state, isLoading: false, isError: true}
        case ORDER_NUMBER.LOAD_SUCCESS:
            return {...state, number: action.number, isLoading: false, isError: false}
        case ORDER_NUMBER.DELETE:
            return orderNumberInitialState;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    ingredientTypes,
    burgerIngredients,
    burgerConstructor,
    modalIngredient,
    orderNumber
});