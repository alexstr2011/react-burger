import {FORGOT_PASSWORD_URL, RESET_PASSWORD_URL} from "../api/urls";
import {AppDispatch, AppThunk} from "../types/types";

export const PASSWORD_ACTIONS = {
    FORGOT_PASSWORD: 'PASSWORD/FORGOT_PASSWORD',
    FORGOT_PASSWORD_SUCCESS: 'PASSWORD/FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILED: 'PASSWORD/FORGOT_PASSWORD_FAILED',
    RESET_PASSWORD: 'PASSWORD/RESET_PASSWORD',
    RESET_PASSWORD_SUCCESS: 'PASSWORD/RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILED: 'PASSWORD/RESET_PASSWORD_FAILED'
};

export interface IPasswordForgotAction {
    readonly type: typeof PASSWORD_ACTIONS.FORGOT_PASSWORD;
}

export interface IPasswordForgotSuccessAction {
    readonly type: typeof PASSWORD_ACTIONS.FORGOT_PASSWORD_SUCCESS;
}

export interface IPasswordForgotFailedAction {
    readonly type: typeof PASSWORD_ACTIONS.FORGOT_PASSWORD_FAILED;
}

export interface IPasswordResetAction {
    readonly type: typeof PASSWORD_ACTIONS.RESET_PASSWORD;
}

export interface IPasswordResetSuccessAction {
    readonly type: typeof PASSWORD_ACTIONS.RESET_PASSWORD_SUCCESS;
}

export interface IPasswordResetFailedAction {
    readonly type: typeof PASSWORD_ACTIONS.RESET_PASSWORD_FAILED;
}

export type TPasswordActions =
    IPasswordForgotAction
    | IPasswordForgotSuccessAction
    | IPasswordForgotFailedAction
    | IPasswordResetAction
    | IPasswordResetSuccessAction
    | IPasswordResetFailedAction;

export const forgotPassword: AppThunk = (email: string) => {
    return function(dispatch: AppDispatch): void {
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

export const resetPassword: AppThunk = (password: string, token: string) => {
    return function(dispatch: AppDispatch): void {
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
