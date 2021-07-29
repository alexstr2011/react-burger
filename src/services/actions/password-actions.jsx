import {FORGOT_PASSWORD_URL, RESET_PASSWORD_URL} from "../api/urls";

export const PASSWORD_ACTIONS = {
    FORGOT_PASSWORD: 'PASSWORD/FORGOT_PASSWORD',
    FORGOT_PASSWORD_SUCCESS: 'PASSWORD/FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILED: 'PASSWORD/FORGOT_PASSWORD_FAILED',
    RESET_PASSWORD: 'PASSWORD/RESET_PASSWORD',
    RESET_PASSWORD_SUCCESS: 'PASSWORD/RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILED: 'PASSWORD/RESET_PASSWORD_FAILED'
};

export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({
            type: PASSWORD_ACTIONS.FORGOT_PASSWORD
        });
        fetch(FORGOT_PASSWORD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed creating order');
                }
                dispatch({
                    type: PASSWORD_ACTIONS.FORGOT_PASSWORD_SUCCESS
                });
            })
            .catch((error) => {
                console.log(error.message);
                dispatch({
                    type: PASSWORD_ACTIONS.FORGOT_PASSWORD_FAILED
                });
            });
    }
}

export function resetPassword(password, token) {
    return function (dispatch) {
        dispatch({
            type: PASSWORD_ACTIONS.RESET_PASSWORD
        });
        fetch(RESET_PASSWORD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, token})
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed creating order');
                }
                dispatch({
                    type: PASSWORD_ACTIONS.RESET_PASSWORD_SUCCESS
                });
            })
            .catch((error) => {
                console.log(error.message);
                dispatch({
                    type: PASSWORD_ACTIONS.RESET_PASSWORD_FAILED
                });
            });
    }
}
