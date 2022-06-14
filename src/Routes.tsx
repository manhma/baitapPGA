import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import LoginPage from './modules/auth/pages/LoginPage';
import SignUpPage from './modules/auth/pages/SignUpPage';
import ProtectedRoute from './modules/common/components/protectedRoute/ProtectedRoute';
import ContactPage from './modules/home/pages/ContactPage';
import HomePage from './modules/home/pages/HomePage';

interface Props {}

export const Routes = (props: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.signUp} component={SignUpPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};
