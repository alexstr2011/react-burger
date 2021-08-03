import {allOrdersReducer, userOrdersReducer} from "./orders-reducer";
import { WS_ALL_ORDERS_ACTION, WS_USER_ORDERS_ACTION } from '../actions/orders-actions';

const state = {
    wsConnected: false,
    error: null,
    data: null
};

const allOrdersData = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3463f7034a000269f45e7",
                "60d3463f7034a000269f45e9",
                "60d3463f7034a000269f45e8",
                "60d3463f7034a000269f45ea"
            ],
            "_id": "",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
};

describe('allOrdersReducer', () => {
    it('should return the initial state', () => {
        const newState = allOrdersReducer(undefined, {});
        expect(newState).toEqual(state);
    });

    it ('should handle CONNECTION_SUCCESS', () => {
        const newState = allOrdersReducer(state, {type: WS_ALL_ORDERS_ACTION.CONNECTION_SUCCESS});
        expect(newState).toEqual({
            ...state,
            wsConnected: true
        });
    });

    it('should handle CONNECTION_ERROR', () => {
        const newState = allOrdersReducer(state,
            {type: WS_ALL_ORDERS_ACTION.CONNECTION_ERROR, payload: 'Error'});

        expect(newState).toEqual({
            ...state,
            error: 'Error'
        });
    });

    it('should handle CONNECTION_CLOSED', () => {
        const newState = allOrdersReducer({...state, wsConnected: true},
            {type: WS_ALL_ORDERS_ACTION.CONNECTION_CLOSED});

        expect(newState).toEqual({
            ...state
        });
    });

    it('should handle GET_MESSAGE', () => {
        const newState = allOrdersReducer(state,
            {type:WS_ALL_ORDERS_ACTION.GET_MESSAGE, payload: allOrdersData});

        expect(newState).toEqual({
            ...state,
            data: allOrdersData
        });
    });
});

const userOrdersDate = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3463f7034a000269f45e9",
                "60d3463f7034a000269f45e7"
            ],
            "_id": "",
            "status": "done",
            "number": 1,
            "createdAt": "2021-06-23T20:11:01.403Z",
            "updatedAt": "2021-06-23T20:11:01.406Z"
        },
        {
            "ingredients": [
                "60d3463f7034a000269f45e9"
            ],
            "_id": "",
            "status": "done",
            "number": 3,
            "createdAt": "2021-06-23T20:13:23.654Z",
            "updatedAt": "2021-06-23T20:13:23.657Z"
        }
    ],
    "total": 2,
    "totalToday": 2
};

describe('userOrdersReducer', () => {
    it('should return the initial state', () => {
        const newState = userOrdersReducer(undefined, {});
        expect(newState).toEqual(state);
    });

    it ('should handle CONNECTION_SUCCESS', () => {
        const newState = userOrdersReducer(state, {type: WS_USER_ORDERS_ACTION.CONNECTION_SUCCESS});
        expect(newState).toEqual({
            ...state,
            wsConnected: true
        });
    });

    it('should handle CONNECTION_ERROR', () => {
        const newState = userOrdersReducer(state,
            {type: WS_USER_ORDERS_ACTION.CONNECTION_ERROR, payload: 'Error'});

        expect(newState).toEqual({
            ...state,
            error: 'Error'
        });
    });

    it('should handle CONNECTION_CLOSED', () => {
        const newState = userOrdersReducer({...state, wsConnected: true},
            {type: WS_USER_ORDERS_ACTION.CONNECTION_CLOSED});

        expect(newState).toEqual({
            ...state
        });
    });

    it('should handle GET_MESSAGE', () => {
        const newState = userOrdersReducer(state,
            {type:WS_USER_ORDERS_ACTION.GET_MESSAGE, payload: userOrdersDate});

        expect(newState).toEqual({
            ...state,
            data: userOrdersDate
        });
    });
});
