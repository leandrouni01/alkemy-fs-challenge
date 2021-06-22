import React from 'react';
import { Switch } from 'react-router-dom';

import Register from 'views/Register';
import Login from 'views/Login';
import AuthRoute from 'components/auth/AuthRoute';
import GuestRoute from 'components/auth/GuestRoute';

const Routes = () => {
  return (
    <div className="container">
      <Switch>
        <GuestRoute path="/register">
          <Register />
        </GuestRoute>
        <GuestRoute path="/login">
          <Login />
        </GuestRoute>
      </Switch>
    </div>
  )
}

export default Routes;