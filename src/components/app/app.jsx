import React from 'react';
import {useDispatch} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import {ProtectedRoute} from '../protected-route/protected-route';
import {ProtectedRouteAuthorized} from '../protected-route-authorized/protected-route-authorized';
import { ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage,
    ResetPasswordPage, Page404 } from '../../pages';
import { getUser } from '../../services/actions/user-actions';

function App() {
    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    return (
        <Router>
            <AppHeader/>
            <Switch>
                <Route path='/' exact={true}>
                    <HomePage/>
                </Route>
                <ProtectedRouteAuthorized path='/login' exact={true}>
                    <LoginPage/>
                </ProtectedRouteAuthorized>
                <ProtectedRouteAuthorized path='/register' exact={true}>
                    <RegisterPage/>
                </ProtectedRouteAuthorized>
                <ProtectedRouteAuthorized path='/forgot-password' exact={true}>
                    <ForgotPasswordPage/>
                </ProtectedRouteAuthorized>
                <ProtectedRouteAuthorized path='/reset-password' exact={true}>
                    <ResetPasswordPage/>
                </ProtectedRouteAuthorized>
                <ProtectedRoute path='/profile' exact={true}>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route>
                    <Page404/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
