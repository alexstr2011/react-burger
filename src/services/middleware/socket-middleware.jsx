import { WEB_SOCKET } from '../actions/orders-actions';

export const socketMiddleware = (wsUrl) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type, socketType, token } = action;

            if (type === WEB_SOCKET.CONNECTION_START) {
                if (token) {
                    socket = new WebSocket(`${wsUrl}?token=${token}`);
                } else {
                    socket = new WebSocket(`${wsUrl}/all`);
                }
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({
                        type: WEB_SOCKET.CONNECTION_SUCCESS,
                        payload: event,
                        socketType
                    });
                };

                socket.onerror = event => {
                    dispatch({
                        type: WEB_SOCKET.CONNECTION_ERROR,
                        payload: event,
                        socketType
                    });
                };

                socket.onmessage = event => {
                    dispatch({
                        type: WEB_SOCKET.GET_MESSAGE,
                        payload: JSON.parse(event.data),
                        socketType
                    });
                };

                socket.onclose = event => {
                    dispatch({
                        type: WEB_SOCKET.CONNECTION_CLOSED,
                        payload: JSON.parse(event.data),
                        socketType
                    });
                };
            }

            next(action);
        };
    };
};
