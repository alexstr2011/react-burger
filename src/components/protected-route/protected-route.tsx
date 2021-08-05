import {FC} from "react";
import { Route, Redirect, RouteProps } from 'react-router-dom';
import {useSelector} from '../../services/types/types';
import {getCookie} from "../../utils/cookies";

export const ProtectedRoute: FC<RouteProps> = ({children, ...rest}) => {
    const user = useSelector(store => store.userReducer.user);
    const isToken = getCookie('accessToken');
    return (
        <Route
            {...rest}
            render={({location}) =>
                user && user.name || isToken ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};