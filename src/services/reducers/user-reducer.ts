import {
    IUserGetUserSuccessAction,
    IUserLoginSuccessAction,
    IUserRegisterSuccessAction, IUserUpdateUserSuccessAction,
    TUserActions,
    USER_ACTIONS
} from '../actions/user-actions'
import {TUserInfo} from "../types/types";

type TUserState = {
    readonly user: {
        readonly name: null | string;
        readonly email: null | string;
    };
    readonly isLoading: boolean;
    readonly isError: boolean;
};

const userInitialState: TUserState = {
    user: {
        name: null,
        email: null
    },
    isLoading: false,
    isError: false
};

export const userReducer = (state = userInitialState, action: TUserActions) => {
    switch(action.type) {
        case USER_ACTIONS.LOGIN:
            return {...state, user: userInitialState.user, isLoading: true, isError: false}
        case USER_ACTIONS.LOGIN_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.LOGIN_SUCCESS:
            return {...state, user: (action as IUserLoginSuccessAction).user, isLoading: false, isError: false}
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
            return {...state, user: (action as IUserRegisterSuccessAction).user, isLoading: false, isError: false}
        case USER_ACTIONS.GET_USER:
            return {...state, user: userInitialState.user, isLoading: true, isError: false}
        case USER_ACTIONS.GET_USER_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.GET_USER_SUCCESS:
            return {...state, user: (action as IUserGetUserSuccessAction).user, isLoading: false, isError: false}
        case USER_ACTIONS.UPDATE_USER:
            return {...state, isLoading: true, isError: false}
        case USER_ACTIONS.UPDATE_USER_FAILED:
            return {...state, isLoading: false, isError: true}
        case USER_ACTIONS.UPDATE_USER_SUCCESS:
            return {...state, user: (action as IUserUpdateUserSuccessAction).user, isLoading: false, isError: false}
        default:
            return state;
    }
}
