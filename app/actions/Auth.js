/**
 * Created by nathanyam on 5/03/2016.
 */

import { hostname, fetchApi } from '../stores/Constants';

async function loginRequest(user, password) {
  let response = await fetchApi(`${hostname}/login`, {
    method: 'POST',
    body: JSON.stringify({ user, password })
  });
  return await response.json();
}

async function logoutRequest() {
  let response = await fetchApi(`${hostname}/logout`);
  return await response.json();
}

export const LOGGING_IN = 'LOGGING_IN';
export function loggingIn() {
  return {
    type: LOGGING_IN
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function login(username, password) {
  return dispatch => {
    dispatch(loggingIn());

    loginRequest(username, password)
      .then(response => {
        return dispatch(loggedIn(response));
      })
      .catch(err => {
        return dispatch(loginFailed(err));
      })
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loggedIn(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export const LOGIN_FAILED = 'LOGIN_FAILED';
export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export function logout() {
  return dispatch => {
    logoutRequest()
      .then(() => dispatch(logoutSuccess()));
  }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}
