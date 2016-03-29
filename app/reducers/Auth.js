/**
 * Created by nathanyam on 5/03/2016.
 */

import Immutable from 'immutable';
import * as AuthActions from '../actions/Auth';

export const auth = (state = Immutable.Map({ isLoggedIn: false, requireAuth: false }), action) => {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
      state = state.set('isFetching', true);
      return state;

    case AuthActions.LOGIN_SUCCESS:
      state = state.set('isFetching', false);
      state = state.set('isLoggedIn', true);
      state = state.set('user', action.user);
      return state;

    case AuthActions.LOGIN_FAILED:
      state = state.set('isLoggedIn', false);
      state = state.set('error', action.error);
      return state;

    case AuthActions.LOGOUT_REQUEST:
      state = state.set('isFetching', true);
      return state;

    case AuthActions.LOGOUT_SUCCESS:
      state = state.set('isFetching', false);
      state = state.set('isLoggedIn', false);
      state = state.set('user', {});
      return state;

    default:
      return state
  }
};

