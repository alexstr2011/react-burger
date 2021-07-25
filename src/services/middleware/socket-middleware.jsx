import {WEB_SOCKET_ACTION, WEB_SOCKET_TYPE} from '../actions/orders-actions';

export const socketMiddleware = (wsUrl, socketType) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type, token } = action;

            if (type === WEB_SOCKET_ACTION.CONNECTION_START) {
                if (token) {
                    socket = new WebSocket(`${wsUrl}?token=${token}`);
                } else {
                    socket = new WebSocket(`${wsUrl}/all`);
                }
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({
                        type: WEB_SOCKET_ACTION.CONNECTION_SUCCESS,
                        payload: event,
                        socketType
                    });
                };

                socket.onerror = event => {
                    dispatch({
                        type: WEB_SOCKET_ACTION.CONNECTION_ERROR,
                        payload: event,
                        socketType
                    });
                };

                socket.onmessage = event => {
                    dispatch({
                        type: WEB_SOCKET_ACTION.GET_MESSAGE,
                        payload: JSON.parse(event.data),
                        socketType
                    });
                };

                socket.onclose = event => {
                    dispatch({
                        type: WEB_SOCKET_ACTION.CONNECTION_CLOSED,
                        payload: event,
                        socketType
                    });
                };
            }

            next(action);
        };
    };
};
