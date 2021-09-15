import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AuthChecker from './pages/AuthChecker';
import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <AuthChecker token={undefined} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
