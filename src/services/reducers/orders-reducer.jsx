import { WS_ALL_ORDERS_ACTION, WS_USER_ORDERS_ACTION } from '../actions/orders-actions';

const initialState = {
    wsConnected: false,
    error: null,
    data: null
};

export const allOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_ALL_ORDERS_ACTION.CONNECTION_SUCCESS:
            return {
                ...state,
                error: null,
                wsConnected: true
            };
        case WS_ALL_ORDERS_ACTION.CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_ALL_ORDERS_ACTION.CONNECTION_CLOSED:
            return {
                ...state,
                error: null,
                wsConnected: false
            };
        case WS_ALL_ORDERS_ACTION.GET_MESSAGE:
            return {
                ...state,
                error: null,
                data: action.payload
            };
        default:
            return state;
    }
}

export const userOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_USER_ORDERS_ACTION.CONNECTION_SUCCESS:
            return {
                ...state,
                error: null,
                wsConnected: true
            };
        case WS_USER_ORDERS_ACTION.CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_USER_ORDERS_ACTION.CONNECTION_CLOSED:
            return {
                ...state,
                error: null,
                wsConnected: false
            };
        case WS_USER_ORDERS_ACTION.GET_MESSAGE:
            return {
                ...state,
                error: null,
                data: action.payload
            };
        default:
            return state;
    }
}