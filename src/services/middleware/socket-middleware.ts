import {MiddlewareAPI, AnyAction} from 'redux';
import {WS_ALL_ORDERS_ACTION, WS_USER_ORDERS_ACTION} from '../actions/orders-actions';

export const socketMiddlewareAllOrders = (wsUrl: string) => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next: (arg: AnyAction) => void) => (action: AnyAction) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === WS_ALL_ORDERS_ACTION.CONNECTION_START) {
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({
                        type: WS_ALL_ORDERS_ACTION.CONNECTION_SUCCESS,
                        payload: event
                    });
                };

                socket.onerror = event => {
                    dispatch({
                        type: WS_ALL_ORDERS_ACTION.CONNECTION_ERROR,
                        payload: event
                    });
                };

                socket.onmessage = event => {
                    dispatch({
                        type: WS_ALL_ORDERS_ACTION.GET_MESSAGE,
                        payload: JSON.parse(event.data),
                    });
                };

                socket.onclose = event => {
                    dispatch({
                        type: WS_ALL_ORDERS_ACTION.CONNECTION_CLOSED,
                        payload: event
                    });
                };
            }

            next(action);
        };
    };
};

export const socketMiddlewareUserOrders = (wsUrl: string) => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next: (arg: AnyAction) => void) => (action: AnyAction) => {
            const { dispatch } = store;
            const { type, token } = action;

            if (type === WS_USER_ORDERS_ACTION.CONNECTION_START) {
                socket = new WebSocket(`${wsUrl}?token=${token}`);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({
                        type: WS_USER_ORDERS_ACTION.CONNECTION_SUCCESS,
                        payload: event
                    });
                };

                socket.onerror = event => {
                    dispatch({
                        type: WS_USER_ORDERS_ACTION.CONNECTION_ERROR,
                        payload: event
                    });
                };

                socket.onmessage = event => {
                    const parsedData = JSON.parse(event.data);
                    dispatch({
                        type: WS_USER_ORDERS_ACTION.GET_MESSAGE,
                        payload: parsedData
                    });
                };

                socket.onclose = event => {
                    dispatch({
                        type: WS_USER_ORDERS_ACTION.CONNECTION_CLOSED,
                        payload: event
                    });
                };
            }

            next(action);
        };
    };
};

