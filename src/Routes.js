import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from 'views/Register';
import Login from 'views/Login';

const Routes = () => {
  return (
    <div className="container">
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  )
}

export default Routes;