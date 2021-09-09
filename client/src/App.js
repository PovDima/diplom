import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { getUser } from "./store/actions/users";

import ConfirmPage from './pages/ConfirmPage'
import Statements from './pages/Statements'
import NavBar from './pages/NavBar'
import LoginForgot from './pages/LoginForgot'
import Login from './pages/Login'
import LoginResetPassword from './pages/LoginResetPassword'
import Logout from './pages/Logout'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'
import ErrorBoundary from './pages/ErrorBoundary'
import FilePage from "./pages/FilePage";
import Offers from "./pages/Offers";
import Loader from "./components/Loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
      .then(() => { setIsLoading(false) })
      .catch(() => { setIsLoading(false) });
    // eslint-disable-next-line
  }, []);

  return (
    <ErrorBoundary >
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <Switch>
          <ProtectedRoute path='/statements' exact component={Statements} />
          <ProtectedRoute path='/offers' exact component={Offers} />
          <ProtectedRoute path='/files' exact component={FilePage} />
          <Route path='/account/confirm/:token' exact component={ConfirmPage} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <Route path='/login/forgot' exact component={LoginForgot} />
          <Route path='/login/reset/:token' component={LoginResetPassword} />
          <ProtectedRoute path='/logout' exact component={Logout} />
          <Redirect from='/' exact to='/statements' />
          <Redirect to='/statements' />
        </Switch>
      )}
    </ErrorBoundary >
  );
}
