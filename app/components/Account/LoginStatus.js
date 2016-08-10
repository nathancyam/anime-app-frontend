/**
 * Created by nathanyam on 5/03/2016.
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  isLoggedIn: PropTypes.bool
};

function LoginStatus({ isLoggedIn }) {

  function renderLink() {
    if (isLoggedIn) {
      return (<Link to="/logout"><i className="fa fa-sign-out" /> Logout</Link>);
    } else {
      return (<Link to="/login"><i className="fa fa-sign-in" /> Login</Link>);
    }
  }

  return renderLink();
}

LoginStatus.propTypes = propTypes;

export default LoginStatus;
