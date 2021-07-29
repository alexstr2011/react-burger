import {WS_ALL_ORDERS_ACTION, WS_USER_ORDERS_ACTION} from '../actions/orders-actions';
import {refreshToken} from "../actions/actions";
import {getCookie} from "../../utils/cookies";

export const socketMiddlewareAllOrders = (wsUrl) => {
    return store => {
        let socket = null;

        return next => action => {
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

export const socketMiddlewareUserOrders = (wsUrl) => {
    return store => {
        let socket = null;

        return next => action => {
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
                    if (parsedData.message && parsedData.message === "Invalid or missing token") {
                        dispatch(refreshToken({
                            type: WS_USER_ORDERS_ACTION.CONNECTION_START,
                            token: getCookie('accessToken')
                        }));
                    } else {
                        dispatch({
                            type: WS_USER_ORDERS_ACTION.GET_MESSAGE,
                            payload: parsedData
                        });
                    }
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
