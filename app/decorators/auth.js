/**
 * Created by nathanyam on 28/03/2016.
 */

"use strict";

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import Login from '../views/Login';
import { push } from 'react-router-redux';
import { loggedIn } from '../modules/Auth/actions';
import Immutable from 'immutable';

/**
 * @param {Object} headers
 * @returns {Promise}
 */
export async function getUser(headers) {
  const authService = new AuthService();
  return await authService.getUser(headers);
}

export function requireAuth(WrappedComponent) {

  const _localStorage = (() => {
    return (typeof window !== 'undefined')
      ? localStorage
      : { getItem() {} }
  })();

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

    _isLoggedIn = () => {
      let _currentUser = false;
      const { currentUser, auth, loginUserFromStorage } = this.props;

      if (currentUser && !auth.get('isLoggedIn')) {
        _currentUser = JSON.parse(currentUser);
        loginUserFromStorage(Immutable.fromJS(_currentUser));
      }

      return auth.get('isLoggedIn') || _currentUser
    };
    
    checkAuth = () => {
      if (!this._isLoggedIn()) {
        this.props.onRedirectToLogin();
      }
    };

    render() {
      if (this._isLoggedIn()) {
        return <WrappedComponent {...this.props} />;
      }

      return <Login {...this.props} />;
    }
  }

  AuthComponent.propTypes = {
    auth: PropTypes.object.isRequired,
    currentUser: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onRedirectToLogin: PropTypes.func.isRequired,
    loginUserFromStorage: PropTypes.func.isRequired,
  };

  const mapStateToProps = ({ auth }) => ({
    auth,
    currentUser: _localStorage.getItem('current_user') || false,
  });

  const mapDispatchToProps = (dispatch) => ({
    onRedirectToLogin: () => dispatch(push('/login')),
    loginUserFromStorage: (user) => dispatch(loggedIn(user)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
}

