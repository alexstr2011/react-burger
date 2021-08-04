import {
    I_WS_AllOrdersConnectionErrorAction, I_WS_AllOrdersGetMessageAction,
    I_WS_UserOrdersConnectionErrorAction, I_WS_UserOrdersGetMessageAction,
    T_WS_AllOrdersActions,
    T_WS_UserOrdersActions,
    WS_ALL_ORDERS_ACTION,
    WS_USER_ORDERS_ACTION
} from '../actions/orders-actions';
import {TOrder} from "../types/types";

type TOrdersState = {
    wsConnected: boolean;
    error: null | string,
    data: null | TOrder;
};

const initialState: TOrdersState = {
    wsConnected: false,
    error: null,
    data: null
};

export const allOrdersReducer = (state = initialState, action: T_WS_AllOrdersActions): TOrdersState => {
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
                error: (action as I_WS_AllOrdersConnectionErrorAction).payload,
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
                data: (action as I_WS_AllOrdersGetMessageAction).payload
            };
        default:
            return state;
    }
};

export const userOrdersReducer = (state = initialState, action: T_WS_UserOrdersActions): TOrdersState => {
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
                error: (action as I_WS_UserOrdersConnectionErrorAction).payload,
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
                data: (action as I_WS_UserOrdersGetMessageAction).payload
            };
        default:
            return state;
    }
};