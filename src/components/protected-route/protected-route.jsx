import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";

export function ProtectedRoute({children, ...rest}) {
    const user = useSelector(store => store.userReducer.user);
    return (
        <Route
            {...rest}
            render={({location}) =>
                user && user.name ? (
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