/**
 * Created by nathanyam on 5/03/2016.
 */

import Reflux from 'reflux';
import Immutable from 'immutable';
import { hostname, fetchApi } from './Constants';

let user = new Immutable.Map({
  isLoggedIn: false
});

export var Actions = Reflux.createActions([
  'isLoggedIn',
  'getUser',
  'signIn',
  'signOut'
]);

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

export default Reflux.createStore({
  listenables: [Actions],

  onIsLoggedIn() {
    return this.trigger({ isLoggedIn: Boolean(Object.keys(user.toJS()).length) });
  },

  onSignIn(user, password) {
    loginRequest(user, password)
      .then(() => {
        user = user.set('isLoggedIn', true);
        this.trigger(user);
      });
  },

  onSignOut() {
    logoutRequest()
      .then(() => {
        user = user.set('isLoggedIn', false);
        this.trigger(user);
      });
  }
});
