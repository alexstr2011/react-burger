import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import Page404 from '../../pages/page-404';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from  '../../pages/forgot-password';
import ResetPasswordPage from  '../../pages/reset-password';

function App() {
    return (
        <Router>
            <AppHeader/>
            <Switch>
                <Route path='/' exact={true}>
                    <HomePage/>
                </Route>
                <Route path='/login' exact={true}>
                    <LoginPage/>
                </Route>
                <Route path='/register' exact={true}>
                    <RegisterPage/>
                </Route>
                <Route path='/forgot-password' exact={true}>
                    <ForgotPasswordPage/>
                </Route>
                <Route path='/reset-password' exact={true}>
                    <ResetPasswordPage/>
                </Route>
                <Route>
                    <Page404/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
