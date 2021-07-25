import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "../reducers/reducers";
import {socketMiddleware} from "../middleware/socket-middleware";
import {GET_ORDERS_URL} from "../api/urls";
import {WEB_SOCKET_TYPE} from "../actions/orders-actions";

export const initStore = () => {
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;
    const enhancer = composeEnhancers(applyMiddleware(thunk,
        socketMiddleware(GET_ORDERS_URL, WEB_SOCKET_TYPE.ALL_ORDERS),
        socketMiddleware(GET_ORDERS_URL, WEB_SOCKET_TYPE.USER_ORDERS)));

    return createStore(rootReducer, enhancer);
};
