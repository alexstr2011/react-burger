import {setCookie, getCookie, deleteCookie} from '../../utils/cookies';
import {refreshToken} from "./actions";
import {
    REGISTER_URL,
    LOGIN_URL,
    LOGOUT_URL,
    GET_USER_URL
} from "../api/urls";
import {TUserInfo} from "../types/types";

export const USER_ACTIONS = {
    LOGIN: 'USER/LOGIN',
    LOGIN_SUCCESS: 'USER/LOGIN_SUCCESS',
    LOGIN_FAILED: 'USER/LOGIN_FAILED',
    LOGOUT: 'USER/LOGOUT',
    LOGOUT_SUCCESS: 'USER/LOGOUT_SUCCESS',
    LOGOUT_FAILED: 'USER/LOGOUT_FAILED',
    REGISTER: 'USER/REGISTER',
    REGISTER_SUCCESS: 'USER/REGISTER_SUCCESS',
    REGISTER_FAILED: 'USER/REGISTER_FAILED',
    GET_USER: 'USER/GET_USER',
    GET_USER_SUCCESS: 'USER/GET_USER_SUCCESS',
    GET_USER_FAILED: 'USER/GET_USER_FAILED',
    UPDATE_USER: 'USER/UPDATE_USER',
    UPDATE_USER_SUCCESS: 'USER/UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILED: 'USER/UPDATE_USER_FAILED'
};

export interface IUserLoginAction {
    readonly type: typeof USER_ACTIONS.LOGIN;
}

export interface IUserLoginSuccessAction {
    readonly type: typeof USER_ACTIONS.LOGIN_SUCCESS;
    readonly user: TUserInfo;
}

export interface IUserLoginFailedAction {
    readonly type: typeof USER_ACTIONS.LOGIN_FAILED;
}

export interface IUserLogoutAction {
    readonly type: typeof USER_ACTIONS.LOGOUT;
}

export interface IUserLogoutSuccessAction {
    readonly type: typeof USER_ACTIONS.LOGOUT_SUCCESS;
}

export interface IUserLogoutFailedAction {
    readonly type: typeof USER_ACTIONS.LOGOUT_FAILED;
}

export interface IUserRegisterAction {
    readonly type: typeof USER_ACTIONS.REGISTER;
}

export interface IUserRegisterSuccessAction {
    readonly type: typeof USER_ACTIONS.REGISTER_SUCCESS;
    readonly user: TUserInfo;
}

export interface IUserRegisterFailedAction {
    readonly type: typeof USER_ACTIONS.REGISTER_FAILED;
}

export interface IUserGetUserAction {
    readonly type: typeof USER_ACTIONS.GET_USER;
}

export interface IUserGetUserSuccessAction {
    readonly type: typeof USER_ACTIONS.GET_USER_SUCCESS;
    readonly user: TUserInfo;
}

export interface IUserGetUserFailedAction {
    readonly type: typeof USER_ACTIONS.GET_USER_FAILED;
}

export interface IUserUpdateUserAction {
    readonly type: typeof USER_ACTIONS.UPDATE_USER;
}

export interface IUserUpdateUserSuccessAction {
    readonly type: typeof USER_ACTIONS.UPDATE_USER_SUCCESS;
    readonly user: TUserInfo;
}

export interface IUserUpdateUserFailedAction {
    readonly type: typeof USER_ACTIONS.UPDATE_USER_FAILED;
}

export type TUserActions =
    IUserLoginAction
    | IUserLoginSuccessAction
    | IUserLoginFailedAction
    | IUserLogoutAction
    | IUserLogoutSuccessAction
    | IUserLogoutFailedAction
    | IUserRegisterAction
    | IUserRegisterSuccessAction
    | IUserRegisterFailedAction
    | IUserGetUserAction
    | IUserGetUserSuccessAction
    | IUserGetUserFailedAction
    | IUserUpdateUserAction
    | IUserUpdateUserSuccessAction
    | IUserUpdateUserFailedAction;

export function register(email, password, name) {
    return function(dispatch) {
        dispatch({
            type: USER_ACTIONS.REGISTER
        });

        fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed to register the user');
                }
                const { accessToken, refreshToken } = response;
                setCookie('accessToken', accessToken.split('Bearer ')[1], {expires: 20 * 60});
                localStorage.setItem('refreshToken', refreshToken);

                dispatch({
                    type: USER_ACTIONS.REGISTER_SUCCESS,
                    user: response.user
                });
            })
            .catch((error) => {
                console.log(error.message);
                dispatch({
                    type: USER_ACTIONS.REGISTER_FAILED
                });
            });
    }
}

export function login(email, password) {
    return function(dispatch) {
        dispatch({
            type: USER_ACTIONS.LOGIN
        });

        fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed to login');
                }
                const { accessToken, refreshToken } = response;
                setCookie('accessToken', accessToken.split('Bearer ')[1], {expires: 20 * 60});
                localStorage.setItem('refreshToken', refreshToken);

                dispatch({
                    type: USER_ACTIONS.LOGIN_SUCCESS,
                    user: response.user
                });
            })
            .catch((error) => {
                console.log(error.message);
                dispatch({
                    type: USER_ACTIONS.LOGIN_FAILED
                });
            });
    }
}

export function logout() {
    return function(dispatch) {
        dispatch({
            type: USER_ACTIONS.LOGOUT
        });

        fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed to logout');
                }

                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({
                    type: USER_ACTIONS.LOGOUT_SUCCESS
                });
            })
            .catch((error) => {
                console.log(error.message);
                dispatch({
                    type: USER_ACTIONS.LOGOUT_FAILED
                });
            });
    }
}

export function getUser() {
    return function(dispatch) {
        dispatch({
            type: USER_ACTIONS.GET_USER
        });
        fetch(GET_USER_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie('accessToken')
            }
        }).then((response) => {
            return response.json();
        })
            .then((response) => {
                if (!response.success) {
                    throw response;
                }

                dispatch({
                    type: USER_ACTIONS.GET_USER_SUCCESS,
                    user: response.user
                });
            })
            .catch((error) => {
                if (error.message === 'jwt expired') {
                    dispatch(refreshToken(getUser()));
                }
                dispatch({
                    type: USER_ACTIONS.GET_USER_FAILED
                });
            });
    }
}

export function updateUser(email, password, name) {
    return function(dispatch) {
        dispatch({
            type: USER_ACTIONS.UPDATE_USER
        });
        fetch(GET_USER_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({email, password, name})
        }).then((response) => {
            return response.json();
        })
            .then((response) => {
                if (!response.success) {
                    throw response;
                }

                dispatch({
                    type: USER_ACTIONS.UPDATE_USER_SUCCESS,
                    user: response.user
                });
            })
            .catch((error) => {
                if (error.message === 'jwt expired') {
                    dispatch(refreshToken(updateUser(email, password, name)));
                }

                console.log(error.message);
                dispatch({
                    type: USER_ACTIONS.UPDATE_USER_FAILED
                });
            });
    }
}
