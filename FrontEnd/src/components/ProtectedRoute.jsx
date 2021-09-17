import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ path, children }) {
  if (window.sessionStorage.getItem('userDetails') === null) {
    return <Redirect to="/login" />;
  }
  return <Route path={path}>{children}</Route>;
}

ProtectedRoute.defaultProps = {
  path: '/',
  children: undefined,
};

ProtectedRoute.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};
