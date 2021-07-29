import {setCookie, getCookie, deleteCookie} from '../../utils/cookies';
import {refreshToken} from "./actions";
import {
    REGISTER_URL,
    LOGIN_URL,
    LOGOUT_URL,
    GET_USER_URL
} from "../api/urls";

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
