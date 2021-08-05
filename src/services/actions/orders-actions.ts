import {TOrders} from "../types/types";

export const WS_ALL_ORDERS_ACTION = {
    CONNECTION_START: 'WS_ALL_ORDERS_ACTION/CONNECTION_START',
    CONNECTION_SUCCESS: 'WS_ALL_ORDERS_ACTION/CONNECTION_SUCCESS',
    CONNECTION_ERROR: 'WS_ALL_ORDERS_ACTION/CONNECTION_ERROR',
    CONNECTION_CLOSED: 'WS_ALL_ORDERS_ACTION/CONNECTION_CLOSED',
    GET_MESSAGE: 'WS_ALL_ORDERS_ACTION/GET_MESSAGE',
};

export interface I_WS_AllOrdersConnectionStartAction {
    readonly type: typeof WS_ALL_ORDERS_ACTION.CONNECTION_START;
}

export interface I_WS_AllOrdersConnectionSuccessAction {
    readonly type: typeof WS_ALL_ORDERS_ACTION.CONNECTION_SUCCESS;
}

export interface I_WS_AllOrdersConnectionErrorAction {
    readonly type: typeof WS_ALL_ORDERS_ACTION.CONNECTION_ERROR;
    readonly payload: string;
}

export interface I_WS_AllOrdersConnectionClosedAction {
    readonly type: typeof WS_ALL_ORDERS_ACTION.CONNECTION_CLOSED;
}

export interface I_WS_AllOrdersGetMessageAction {
    readonly type: typeof WS_ALL_ORDERS_ACTION.GET_MESSAGE;
    readonly payload: TOrders;
}

export type T_WS_AllOrdersActions =
    I_WS_AllOrdersConnectionStartAction
    | I_WS_AllOrdersConnectionSuccessAction
    | I_WS_AllOrdersConnectionErrorAction
    | I_WS_AllOrdersConnectionClosedAction
    | I_WS_AllOrdersGetMessageAction;

export const WS_USER_ORDERS_ACTION = {
    CONNECTION_START: 'WS_USER_ORDERS_ACTION/CONNECTION_START',
    CONNECTION_SUCCESS: 'WS_USER_ORDERS_ACTION/CONNECTION_SUCCESS',
    CONNECTION_ERROR: 'WS_USER_ORDERS_ACTION/CONNECTION_ERROR',
    CONNECTION_CLOSED: 'WS_USER_ORDERS_ACTION/CONNECTION_CLOSED',
    GET_MESSAGE: 'WS_USER_ORDERS_ACTION/GET_MESSAGE',
};

export interface I_WS_UserOrdersConnectionStartAction {
    readonly type: typeof WS_USER_ORDERS_ACTION.CONNECTION_START;
}

export interface I_WS_UserOrdersConnectionSuccessAction {
    readonly type: typeof WS_USER_ORDERS_ACTION.CONNECTION_SUCCESS;
}

export interface I_WS_UserOrdersConnectionErrorAction {
    readonly type: typeof WS_USER_ORDERS_ACTION.CONNECTION_ERROR;
    readonly payload: string;
}

export interface I_WS_UserOrdersConnectionClosedAction {
    readonly type: typeof WS_USER_ORDERS_ACTION.CONNECTION_CLOSED;
}

export interface I_WS_UserOrdersGetMessageAction {
    readonly type: typeof WS_USER_ORDERS_ACTION.GET_MESSAGE;
    readonly payload: TOrders;
}

export type T_WS_UserOrdersActions =
    | I_WS_UserOrdersConnectionStartAction
    | I_WS_UserOrdersConnectionSuccessAction
    | I_WS_UserOrdersConnectionErrorAction
    | I_WS_UserOrdersConnectionClosedAction
    | I_WS_UserOrdersGetMessageAction;
