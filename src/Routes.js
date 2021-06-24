import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from 'views/Register';
import Login from 'views/Login';
import Home from 'views/Home';
import AuthRoute from 'components/auth/AuthRoute';
import GuestRoute from 'components/auth/GuestRoute';
import ManageOperations from 'views/ManageOperations';
import CreateOperation from 'views/CreateOperation';
import EditOperation from 'views/EditOperation';

const Routes = () => {
  return (
    <div className="container pb-container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <GuestRoute path="/register">
          <Register />
        </GuestRoute>
        <GuestRoute path="/login">
          <Login />
        </GuestRoute>
        <AuthRoute path="/operations/create">
          <CreateOperation />
        </AuthRoute>
        <AuthRoute path="/operations/:id/edit">
          <EditOperation />
        </AuthRoute>
        <AuthRoute path="/operations">
          <ManageOperations />
        </AuthRoute>
      </Switch>
    </div>
  )
}

export default Routes;