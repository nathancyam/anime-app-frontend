/**
 * Created by nathanyam on 5/03/2016.
 */

import AuthService from '../../services/AuthService';
import { push } from 'react-router-redux';

export const LOGGING_IN = 'app/Auth/LOGGING_IN';
export function loggingIn() {
  return {
    type: LOGGING_IN
  };
}

export const LOGIN_REQUEST = 'app/Auth/LOGIN_REQUEST';
export function login(username, password) {
  const authService = new AuthService();

  return dispatch => {
    dispatch(loggingIn());

    authService.login(username, password)
      .then(response => {
        return dispatch(loggedIn(response));
      })
      .catch(err => {
        return dispatch(loginFailed(err));
      })
  };
}

export const LOGIN_SUCCESS = 'app/Auth/LOGIN_SUCCESS';
export function loggedIn(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export const LOGIN_FAILED = 'app/Auth/LOGIN_FAILED';
export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export const LOGOUT_REQUEST = 'app/Auth/LOGOUT_REQUEST';
export function logout() {
  const authService = new AuthService();

  return dispatch => {
    authService.logout()
      .then(() => dispatch(push('/')))
      .then(() => dispatch(logoutSuccess()));
  }
}

export const LOGOUT_SUCCESS = 'app/Auth/LOGOUT_SUCCESS';
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}
