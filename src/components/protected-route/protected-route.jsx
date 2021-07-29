import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import {getCookie} from "../../utils/cookies";

export function ProtectedRoute({children, ...rest}) {
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
}