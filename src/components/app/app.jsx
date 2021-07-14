import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {ProtectedRoute} from '../protected-route/protected-route';
import {ProtectedRouteAuthorized} from '../protected-route-authorized/protected-route-authorized';
import { ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage,
    ResetPasswordPage, Page404 } from '../../pages';
import { getUser } from '../../services/actions/user-actions';
import { burgerIngredientsLoad } from '../../services/actions/actions';
import styles from './app.module.css';

function App() {
    const dispatch = useDispatch();
    const {isLoading, isError, data} = useSelector(store => store.burgerIngredientsReducer);
    React.useEffect(() => {
        dispatch(getUser());
        dispatch(burgerIngredientsLoad());
    }, [dispatch]);

    const history = useHistory();
    const location = useLocation();
    const background = history.action === 'PUSH' && location.state && location.state.background;
    const closeModal = () => {
        history.goBack();
    }

    return (
        <>
            <AppHeader/>
            {isLoading && <p className={styles.info}>Loading...</p>}
            {isError && <p className={styles.error}>Failed getting data from server</p>}
            {!isLoading && !isError && !!data.length && (
                <>
                    <Switch location={background || location}>
                        <Route path='/' exact>
                            <HomePage/>
                        </Route>
                        <ProtectedRouteAuthorized path='/login' exact>
                            <LoginPage/>
                        </ProtectedRouteAuthorized>
                        <ProtectedRouteAuthorized path='/register' exact>
                            <RegisterPage/>
                        </ProtectedRouteAuthorized>
                        <ProtectedRouteAuthorized path='/forgot-password' exact>
                            <ForgotPasswordPage/>
                        </ProtectedRouteAuthorized>
                        <ProtectedRouteAuthorized path='/reset-password' exact>
                            <ResetPasswordPage/>
                        </ProtectedRouteAuthorized>
                        <ProtectedRoute path='/profile' exact>
                            <ProfilePage/>
                        </ProtectedRoute>
                        <Route path='/ingredients/:id' exact>
                            <IngredientDetails addTitle />
                        </Route>
                        <Route>
                            <Page404/>
                        </Route>
                    </Switch>
                    {
                        background && (
                            <Route path='/ingredients/:id' exact>
                                <Modal title='Детали ингредиента' closeModal={closeModal}>
                                    <IngredientDetails/>
                                </Modal>
                            </Route>
                        )
                    }
                </>
            )}
        </>
    );
}

export default App;
