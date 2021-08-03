import {userReducer} from "./user-reducer";
import { USER_ACTIONS } from '../actions/user-actions'

const state = {
    user: {
        name: null,
        email: null
    },
    isLoading: false,
    isError: false
};

const userData = {
    "email": "mail@mail.com",
    "name": "user"
};

describe('userReducer', () => {
    it('should return the initial state', () => {
        const newState = userReducer(undefined, {});
        expect(newState).toEqual(state);
    });

    it('should handle LOGIN', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.LOGIN});
        expect(newState).toEqual({
            ...state,
            isLoading: true
        });
    });

    it('should handle LOGIN_FAILED', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.LOGIN_FAILED});
        expect(newState).toEqual({
            ...state,
            isError: true
        });
    });

    it('should handle LOGIN_SUCCESS', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.LOGIN_SUCCESS, user: userData});
        expect(newState).toEqual({
            ...state,
            user: userData
        });
    });

    it('should handle LOGOUT', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.LOGOUT});
        expect(newState).toEqual({
            ...state,
            isLoading: true
        });
    });

    it('should handle LOGOUT_FAILED', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.LOGOUT_FAILED});
        expect(newState).toEqual({
            ...state,
            isError: true
        });
    });

    it('should handle LOGOUT_SUCCESS', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.LOGOUT_SUCCESS});
        expect(newState).toEqual(state);
    });

    it('should handle REGISTER', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.REGISTER});
        expect(newState).toEqual({
            ...state,
            isLoading: true
        });
    });

    it('should handle REGISTER_FAILED', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.REGISTER_FAILED});
        expect(newState).toEqual({
            ...state,
            isError: true
        });
    });

    it('should handle REGISTER_SUCCESS', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.REGISTER_SUCCESS, user: userData});
        expect(newState).toEqual({
            ...state,
            user: userData
        });
    });

    it('should handle GET_USER', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.GET_USER});
        expect(newState).toEqual({
            ...state,
            isLoading: true
        });
    });

    it('should handle GET_USER_FAILED', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.GET_USER_FAILED});
        expect(newState).toEqual({
            ...state,
            isError: true
        });
    });

    it('should handle GET_USER_SUCCESS', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.GET_USER_SUCCESS, user: userData});
        expect(newState).toEqual({
            ...state,
            user: userData
        });
    });

    it('should handle UPDATE_USER', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.UPDATE_USER});
        expect(newState).toEqual({
            ...state,
            isLoading: true
        });
    });

    it('should handle UPDATE_USER_FAILED', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.UPDATE_USER_FAILED});
        expect(newState).toEqual({
            ...state,
            isError: true
        });
    });

    it('should handle UPDATE_USER_SUCCESS', () => {
        const newState = userReducer(state, {type: USER_ACTIONS.UPDATE_USER_SUCCESS, user: userData});
        expect(newState).toEqual({
            ...state,
            user: userData
        });
    });
});
