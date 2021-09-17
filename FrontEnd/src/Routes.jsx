import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoutes from './components/UnprotectedRoutes';
import AuthChecker from './pages/AuthChecker';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.sessionStorage.getItem('userDetails')),
  );
  return (
    <Router>
      <div>
        <Switch>
          <UnprotectedRoutes path="/login" userDetails={userDetails}>
            <Login setUserDetails={setUserDetails} />
          </UnprotectedRoutes>
          <UnprotectedRoutes path="/register" userDetails={userDetails}>
            <Register setUserDetails={setUserDetails} />
          </UnprotectedRoutes>
          <ProtectedRoute path="/home">
            <Home />
          </ProtectedRoute>
          <Route path="/">
            <AuthChecker token={undefined} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
