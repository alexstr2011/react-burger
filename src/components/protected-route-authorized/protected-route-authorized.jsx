import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import {getCookie} from "../../utils/cookies";

export function ProtectedRouteAuthorized({children, isLogin, ...rest}) {
    const user = useSelector(store => store.userReducer.user);
    const isToken = getCookie('accessToken');
    return (
        <Route
            {...rest}
            render={
                ({location}) => {
                    let to = '/';
                    if (isLogin && location.state && location.state.from) {
                        to = location.state.from;
                    }

                    return user && user.name || isToken ? (
                        <Redirect to={to} />
                    ) : (
                        children
                    )
                }
            }
        />
    );
}