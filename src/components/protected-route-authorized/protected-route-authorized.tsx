import {FC} from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import {useSelector} from '../../services/types/types';
import {getCookie} from "../../utils/cookies";

interface IProtectedRouteAuthorizedProps extends RouteProps {
    isLogin?: boolean;
}

interface ICustomState {
    from?: string;
}

export const ProtectedRouteAuthorized: FC<IProtectedRouteAuthorizedProps> =
    ({children, isLogin, ...rest}) => {

    const user = useSelector(store => store.userReducer.user);
    const isToken = getCookie('accessToken');
    return (
        <Route
            {...rest}
            render={
                ({location}) => {
                    const state = location.state as ICustomState;
                    const to = (isLogin && state && state.from) ? state.from : '/';

                    return (user && user.name) || isToken ? (
                        <Redirect to={to} />
                    ) : (
                        children
                    )
                }
            }
        />
    );
};