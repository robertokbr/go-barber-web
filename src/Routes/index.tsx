import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ProfilePage from '../pages/ProfilePage';

const Routes: React.FC = () => (
  <Switch>
    <Route component={SignIn} path="/" exact />
    <Route component={SignUp} path="/signup" />
    <Route component={Dashboard} path="/dashboard" isPrivate />
    <Route component={ProfilePage} path="/profile" isPrivate />
    <Route component={ForgotPassword} path="/forgot_password" />
    <Route component={ResetPassword} path="/reset_password" />
  </Switch>
);

export default Routes;
