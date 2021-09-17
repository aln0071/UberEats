import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function UnprotectedRoutes({ userDetails, path, children }) {
  if (userDetails === null) {
    return <Route to={path}>{children}</Route>;
  }
  return <Redirect to="/home" />;
}

UnprotectedRoutes.defaultProps = {
  userDetails: null,
  path: '',
  children: undefined,
};

UnprotectedRoutes.propTypes = {
  path: PropTypes.string,
  userDetails: PropTypes.oneOfType([PropTypes.object]),
  children: PropTypes.node,
};
