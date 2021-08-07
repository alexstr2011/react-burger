import { passwordReducer} from "./password-reducer";
import { PASSWORD_ACTIONS } from '../actions/password-actions';

const state = {
    isForgot: false,
    isForgotLoading: false,
    isForgotError: false,
    isReset: false,
    isResetLoading: false,
    isResetError: false
};

describe('passwordReducer', () => {
    it('should handle FORGOT_PASSWORD', () => {
        const newState = passwordReducer(state, {type: PASSWORD_ACTIONS.FORGOT_PASSWORD});
        expect(newState).toEqual({
            ...state,
            isForgotLoading: true
        });
    });

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        const newState = passwordReducer(state, {type: PASSWORD_ACTIONS.FORGOT_PASSWORD_FAILED});
        expect(newState).toEqual({
            ...state,
            isForgotError: true
        });
    });

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        const newState = passwordReducer(state, {type: PASSWORD_ACTIONS.FORGOT_PASSWORD_SUCCESS});
        expect(newState).toEqual({
            ...state,
            isForgot: true
        });
    });

    it('should handle RESET_PASSWORD', () => {
        const newState = passwordReducer(state, {type: PASSWORD_ACTIONS.RESET_PASSWORD});
        expect(newState).toEqual({
            ...state,
            isResetLoading: true
        });
    });

    it('should handle RESET_PASSWORD_FAILED', () => {
        const newState = passwordReducer(state, {type: PASSWORD_ACTIONS.RESET_PASSWORD_FAILED});
        expect(newState).toEqual({
            ...state,
            isResetError: true
        });
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const newState = passwordReducer(state, {type: PASSWORD_ACTIONS.RESET_PASSWORD_SUCCESS});
        expect(newState).toEqual({
            ...state,
            isReset: true
        });
    });
});
