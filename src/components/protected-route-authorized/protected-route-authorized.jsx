import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";

export function ProtectedRouteAuthorized({children, ...rest}) {
    const user = useSelector(store => store.userReducer.user);
    return (
        <Route
            {...rest}
            render={({location}) =>
                user && user.name ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: location}
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
}