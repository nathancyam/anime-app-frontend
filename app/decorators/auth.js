/**
 * Created by nathanyam on 28/03/2016.
 */

"use strict";

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import Login from '../views/Login';
import { mapDispatchToProps } from '../containers/Login';

/**
 * @param {Object} headers
 * @returns {Promise}
 */
export async function getUser(headers) {
  const authService = new AuthService();
  return await authService.getUser(headers);
}

export function requireAuth(WrappedComponent) {

  class AuthComponent extends Component {

    constructor(props) {
      super(props);
      this.checkAuth = this.checkAuth.bind(this);
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }
    
    checkAuth = () => {
      if (!this.props.auth.get('isLoggedIn')) {
        this.props.onRedirectToLogin();
      }
    };

    render() {
      if (this.props.auth.get('isLoggedIn')) {
        return <WrappedComponent {...this.props} />;
      }

      return <Login {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth });
  return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
}

