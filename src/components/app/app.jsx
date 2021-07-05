import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import Page404 from '../../pages/page-404';

function App() {

    return (
        <Router>
            <AppHeader/>
            <Switch>
                <Route path='/' exact={true}>
                    <HomePage/>
                </Route>
                <Route>
                    <Page404/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
