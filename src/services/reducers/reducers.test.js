import {ingredientTypesReducer, burgerIngredientsReducer, burgerConstructorReducer, orderNumberReducer} from "./reducers";
import {BURGER_INGREDIENTS, BURGER_CONSTRUCTOR, ORDER_NUMBER} from "../actions/actions";

const ingredientTypesState = [
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

describe('ingredientTypesReducer', () => {
    it('should return the initial state', () => {
        const newState = ingredientTypesReducer(undefined, {});
        expect(newState).toEqual(ingredientTypesState);
    });
});

const burgerIngredientsState = {
    data: [],
    isLoading: false,
    isError: false
};

const burgerIngredientsData = [
    {
        "_id": "60666c42cc7b410027a1a9b1",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    },
    {
        "_id": "60666c42cc7b410027a1a9b5",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0
    }
];

describe('burgerIngredientsReducer', () => {
    it('should return the initial state', () => {
        const newState = burgerIngredientsReducer(undefined, {});
        expect(newState).toEqual(burgerIngredientsState);
    });

    it('should handle LOAD', () => {
        const newState = burgerIngredientsReducer(burgerIngredientsState, {type: BURGER_INGREDIENTS.LOAD});
        expect(newState).toEqual({
            ...burgerIngredientsState,
            isLoading: true
        });
    });

    it('should handle LOAD_FAILED', () => {
        const newState = burgerIngredientsReducer(burgerIngredientsState, {type: BURGER_INGREDIENTS.LOAD_FAILED});
        expect(newState).toEqual({
            ...burgerIngredientsState,
            isError: true
        });
    });

    it('should handle LOAD_SUCCESS', () => {
        const newState = burgerIngredientsReducer(burgerIngredientsState,
            {type: BURGER_INGREDIENTS.LOAD_SUCCESS, data: burgerIngredientsData});
        expect(newState).toEqual({
            ...burgerIngredientsState,
            data: burgerIngredientsData
        });
    });
});

const burgerConstructorState = {
    bun: null,
    inners: []
};

const bunData = {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
};

const notBunData = {
    "_id": "60666c42cc7b410027a1a9b5",
    "name": "Говяжий метеорит (отбивная)",
    "type": "main",
    "proteins": 800,
    "fat": 800,
    "carbohydrates": 300,
    "calories": 2674,
    "price": 3000,
    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v": 0
};
const notBunData2 = {
    "_id": "60666c42cc7b410027a1a9b6",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
};
const notBunData3 = {
    "_id": "60666c42cc7b410027a1a9b7",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
};

describe('burgerConstructorReducer', () => {
    it('should return the initial state', () => {
        const newState = burgerConstructorReducer(undefined, {});
        expect(newState).toEqual(burgerConstructorState);
    });

    it('should handle ADD with bun', () => {
        const localId = 1;
        const action = {
            type: BURGER_CONSTRUCTOR.ADD,
            ingredient: bunData,
            localId
        };
        const newState = burgerConstructorReducer(burgerConstructorState, action);
        expect(newState).toEqual({
            ...burgerConstructorState,
            bun: {...bunData, key: bunData._id + localId}
        });
    });

    it('should handle ADD not with bun', () => {
        const localId = 1;
        const action = {
            type: BURGER_CONSTRUCTOR.ADD,
            ingredient: notBunData,
            localId
        };
        const newState = burgerConstructorReducer(burgerConstructorState, action);
        expect(newState).toEqual({
            ...burgerConstructorState,
            inners: [{...notBunData, key: notBunData._id + localId}]
        });

        const stateInnersNotEmpty = {...burgerConstructorState, inners: [notBunData2] };
        const newStateInnersNotEmpty = burgerConstructorReducer(stateInnersNotEmpty, action);
        expect(newStateInnersNotEmpty).toEqual({
            ...burgerConstructorState,
            inners: [notBunData2, {...notBunData, key: notBunData._id + localId}]
        });
    });

    it('should handle REMOVE with bun', () => {
        const action = {
            type: BURGER_CONSTRUCTOR.REMOVE,
            ingredient: bunData
        };
        const stateWithBun = {...burgerConstructorState, bun: bunData};
        const newState = burgerConstructorReducer(stateWithBun, action);
        expect(newState).toEqual(stateWithBun);
    });

    it('should handle REMOVE not with bun', () => {
        const action = {
            type: BURGER_CONSTRUCTOR.REMOVE,
            ingredient: notBunData,
            index: 0
        };

        const stateInnersNotEmpty = {...burgerConstructorState, inners: [notBunData] };
        const newState = burgerConstructorReducer(stateInnersNotEmpty, action);
        expect(newState).toEqual(burgerConstructorState);

        const stateInnersNotEmptyTwoFirst = {...burgerConstructorState, inners: [notBunData, notBunData2] };
        const newStateTwoFirst = burgerConstructorReducer(stateInnersNotEmptyTwoFirst, action);
        expect(newStateTwoFirst).toEqual({...burgerConstructorState, inners: [notBunData2]});

        const actionTwoLast = {
            type: BURGER_CONSTRUCTOR.REMOVE,
            ingredient: notBunData2,
            index: 1
        }

        const stateInnersNotEmptyTwoLast = {...burgerConstructorState, inners: [notBunData, notBunData2] };
        const newStateTwoLast = burgerConstructorReducer(stateInnersNotEmptyTwoLast, actionTwoLast);
        expect(newStateTwoLast).toEqual({...burgerConstructorState, inners: [notBunData]});
    });

    it('should handle REMOVE_ALL', () => {
        const stateWithIngredients = {...burgerConstructorState, bun: bunData, inners: [notBunData]};
        const newState = burgerConstructorReducer(stateWithIngredients, {type: BURGER_CONSTRUCTOR.REMOVE_ALL});
        expect(newState).toEqual(burgerConstructorState);
    });

    it('should handle MOVE', () => {
        const action = {
            type: BURGER_CONSTRUCTOR.MOVE,
            indexFrom: 0,
            indexTo: 2
        };
        const stateWithIngredients = {...burgerConstructorState, inners: [notBunData, notBunData2, notBunData3]};
        const newState = burgerConstructorReducer(stateWithIngredients, action);
        expect(newState).toEqual({...burgerConstructorState, inners: [notBunData2, notBunData, notBunData3]});
    });
});

const orderNumberState = {
    number: null,
    isLoading: false,
    isError: false
};

describe('orderNumberReducer', () => {
    it('should return the initial state', () => {
        const newState = orderNumberReducer(undefined, {});
        expect(newState).toEqual(orderNumberState);
    });

    it('should handle LOAD', () => {
        const newState = orderNumberReducer(orderNumberState, {type: ORDER_NUMBER.LOAD});
        expect(newState).toEqual({
            ...orderNumberState,
            isLoading: true
        });
    });

    it('should handle LOAD_FAILED', () => {
        const newState = orderNumberReducer(orderNumberState, {type: ORDER_NUMBER.LOAD_FAILED});
        expect(newState).toEqual({
            ...orderNumberState,
            isError: true
        });
    });

    it('should handle LOAD_SUCCESS', () => {
        const newState = orderNumberReducer(orderNumberState, {type: ORDER_NUMBER.LOAD_SUCCESS, number: 1});
        expect(newState).toEqual({
            ...orderNumberState,
            number: 1
        });
    });

    it('should handle DELETE', () => {
        const newState = orderNumberReducer(orderNumberState, {type: ORDER_NUMBER.DELETE});
        expect(newState).toEqual(orderNumberState);
    });
});
