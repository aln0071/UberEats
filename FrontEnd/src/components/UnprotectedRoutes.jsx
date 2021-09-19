import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function UnprotectedRoutes({ path, children }) {
  if (useSelector((state) => state.user.token)) {
    return <Redirect to="/home" />;
  }
  return <Route to={path}>{children}</Route>;
}

UnprotectedRoutes.defaultProps = {
  path: '',
  children: undefined,
};

UnprotectedRoutes.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};
