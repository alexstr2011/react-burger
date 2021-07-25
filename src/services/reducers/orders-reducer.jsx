import { WEB_SOCKET } from '../actions/orders-actions';

const initialState = {
    allOrders: {
        wsConnected: false,
        error: null,
        data: null
    },
    userOrders: {
        wsConnected: false,
        error: null,
        data: null
    }
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case WEB_SOCKET.CONNECTION_SUCCESS:
            return {
                ...state,
                [action.socketType]: {
                    ...state[action.socketType],
                    error: null,
                    wsConnected: true
                }
            };
        case WEB_SOCKET.CONNECTION_ERROR:
            return {
                ...state,
                [action.socketType]: {
                    ...state[action.socketType],
                    error: action.payload,
                    wsConnected: false
                }
            };
        case WEB_SOCKET.CONNECTION_CLOSED:
            return {
                ...state,
                [action.socketType]: {
                    ...state[action.socketType],
                    error: null,
                    wsConnected: false
                }
            };
        case WEB_SOCKET.GET_MESSAGE:
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