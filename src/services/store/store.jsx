import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "../reducers/reducers";
import {socketMiddlewareAllOrders,socketMiddlewareUserOrders} from "../middleware/socket-middleware";
import {GET_ALL_ORDERS_URL, GET_USER_ORDERS_URL} from "../api/urls";

export const initStore = () => {
    const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;
    const enhancer = composeEnhancers(applyMiddleware(thunk,
        socketMiddlewareAllOrders(GET_ALL_ORDERS_URL),
        socketMiddlewareUserOrders(GET_USER_ORDERS_URL)));

    return createStore(rootReducer, enhancer);
};
