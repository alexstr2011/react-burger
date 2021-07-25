import { WEB_SOCKET_ACTION, WEB_SOCKET_TYPE } from '../actions/orders-actions';

const initialState = {
    [WEB_SOCKET_TYPE.ALL_ORDERS]: {
        wsConnected: false,
        error: null,
        data: null
    },
    [WEB_SOCKET_TYPE.USER_ORDERS]: {
        wsConnected: false,
        error: null,
        data: null
    }
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case WEB_SOCKET_ACTION.CONNECTION_SUCCESS:
            return {
                ...state,
                [action.socketType]: {
                    ...state[action.socketType],
                    error: null,
                    wsConnected: true
                }
            };
        case WEB_SOCKET_ACTION.CONNECTION_ERROR:
            return {
                ...state,
                [action.socketType]: {
                    ...state[action.socketType],
                    error: action.payload,
                    wsConnected: false
                }
            };
        case WEB_SOCKET_ACTION.CONNECTION_CLOSED:
            return {
                ...state,
                [action.socketType]: {
                    ...state[action.socketType],
                    error: null,
                    wsConnected: false
                }
            };
        case WEB_SOCKET_ACTION.GET_MESSAGE:
            return {
                ...state,
                [action.socketType]: {
                    ...state[action.socketType],
                    error: null,
                    data: action.payload
                }
            };
        default:
            return state;
    }
}