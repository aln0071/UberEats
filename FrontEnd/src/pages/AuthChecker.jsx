import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthChecker({ token }) {
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Redirect to="/home" />;
}

AuthChecker.defaultProps = {
  token: undefined,
};

AuthChecker.propTypes = {
  token: PropTypes.string,
};
