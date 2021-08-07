import {PASSWORD_ACTIONS, TPasswordActions} from '../actions/password-actions';

type TPasswordState = {
    readonly isForgot: boolean;
    readonly isForgotLoading: boolean;
    readonly isForgotError: boolean;
    readonly isReset: boolean;
    readonly isResetLoading: boolean;
    readonly isResetError: boolean;
};

const passwordInitialState: TPasswordState = {
    isForgot: false,
    isForgotLoading: false,
    isForgotError: false,
    isReset: false,
    isResetLoading: false,
    isResetError: false
};

export const passwordReducer = (state = passwordInitialState, action: TPasswordActions): TPasswordState => {
    switch(action.type) {
        case PASSWORD_ACTIONS.FORGOT_PASSWORD:
            return {...state, isReset: false, isForgot: false, isForgotLoading: true, isForgotError: false}
        case PASSWORD_ACTIONS.FORGOT_PASSWORD_FAILED:
            return {...state, isForgotLoading: false, isForgotError: true}
        case PASSWORD_ACTIONS.FORGOT_PASSWORD_SUCCESS:
            return {...state, isForgot: true, isForgotLoading: false, isForgotError: false}
        case PASSWORD_ACTIONS.RESET_PASSWORD:
            return {...state, isReset: false, isResetLoading: true, isResetError: false}
        case PASSWORD_ACTIONS.RESET_PASSWORD_FAILED:
            return {...state, isResetLoading: false, isResetError: true}
        case PASSWORD_ACTIONS.RESET_PASSWORD_SUCCESS:
            return {...state, isReset: true, isResetLoading: false, isResetError: false}
        default:
            return state;
    }
}
