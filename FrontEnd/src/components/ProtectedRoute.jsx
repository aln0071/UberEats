import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ path, children }) {
  if (useSelector((state) => state.user.token)) {
    return <Route path={path}>{children}</Route>;
  }
  return <Redirect to="/login" />;
}

ProtectedRoute.defaultProps = {
  path: '/',
  children: undefined,
};

ProtectedRoute.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};
