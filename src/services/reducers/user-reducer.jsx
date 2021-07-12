import { USER_ACTIONS } from '../actions/user-actions'

const userInitialState = {
    user: {
        name: null,
        email: null
    },
    isLoading: false,
    isError: false,
    isForgotPassword: false,
    isForgotPasswordLoading: false,
    isForgotPasswordError: false,
    isResetPassword: false,
    isResetPasswordLoading: false,
    isResetPasswordError: false
};

export const userReducer = (state = userInitialState, action) => {
    switch(action.type) {
        case USER_ACTIONS.LOGIN:
            return {...state, user: userInitialState.user, isLoading: true, isError: false}
        case USER_ACTIONS.LOGIN_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.LOGIN_SUCCESS:
            return {...state, user: action.user, isLoading: false, isError: false}
        case USER_ACTIONS.LOGOUT:
            return {...state, isLoading: true, isError: false}
        case USER_ACTIONS.LOGOUT_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.LOGOUT_SUCCESS:
            return {...state, user: userInitialState.user, isLoading: false, isError: false}
        case USER_ACTIONS.REGISTER:
            return {...state, isLoading: true, isError: false}
        case USER_ACTIONS.REGISTER_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.REGISTER_SUCCESS:
            return {...state, user: action.user, isLoading: false, isError: false}
        case USER_ACTIONS.GET_USER:
            return {...state, user: userInitialState.user, isLoading: true, isError: false}
        case USER_ACTIONS.GET_USER_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.GET_USER_SUCCESS:
            return {...state, user: action.user, isLoading: false, isError: false}
        case USER_ACTIONS.UPDATE_USER:
            return {...state, isLoading: true, isError: false}
        case USER_ACTIONS.UPDATE_USER_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.UPDATE_USER_SUCCESS:
            return {...state, user: action.user, isLoading: false, isError: false}
        case USER_ACTIONS.FORGOT_PASSWORD:
            return {...state, isForgotPassword: false, isForgotPasswordLoading: true, isForgotPasswordError: false}
        case USER_ACTIONS.FORGOT_PASSWORD_FAILED:
            return {...state, isForgotPasswordLoading: false, isForgotPasswordError: true}
        case USER_ACTIONS.FORGOT_PASSWORD_SUCCESS:
            return {...state, isForgotPassword: true, isLoading: false, isError: false}
        case USER_ACTIONS.RESET_PASSWORD:
            return {...state, isResetPassword: false, isResetPasswordLoading: true, isResetPasswordError: false}
        case USER_ACTIONS.RESET_PASSWORD_FAILED:
            return {...state, isResetPasswordLoading: false, isResetPasswordError: true}
        case USER_ACTIONS.RESET_PASSWORD_SUCCESS:
            return {...state, isResetPassword: true, isResetPasswordLoading: false, isResetPasswordError: false}
        default:
            return state;
    }
}
