import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import {rootReducer} from "../reducers/reducers";
import {store} from "../store/store";
import {T_WS_AllOrdersActions, T_WS_UserOrdersActions} from "../actions/orders-actions";
import {TBurgerConstructorActions, TBurgerIngredientsActions, TOrderNumberActions} from "../actions/actions";
import {TPasswordActions} from "../actions/password-actions";
import {TUserActions} from "../actions/user-actions";
import {ORDER_STATUSES} from "../../utils/data";

export type TOrder = {
    _id: string;
    ingredients: ReadonlyArray<string>;
    status: string;
    name: string;
    createdAt: string;
    number: number;
};

export type TOrders = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
};

export type TConstructorIngredient = TIngredient & { key: string };

export type TUserInfo = {
    name: null | string;
    email: null | string;
};

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions = TBurgerIngredientsActions
    | TBurgerConstructorActions
    | TOrderNumberActions
    | T_WS_AllOrdersActions
    | T_WS_UserOrdersActions
    | TPasswordActions
    | TUserActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();