/**
 * Created by nathanyam on 28/03/2016.
 */

"use strict";

import { browserHistory } from 'react-router';

/**
 * @typedef {Object} Store
 * @property getState()
 * @property dispatch()
 */

/**
 * @param history
 */
export const authMiddleware = (history) => store => next => action => {
  const authState = store.getState().auth;
  if (!authState.has('current_user') && authState.get('requireAuth')) {
    console.log('requies auth');
  }
  next(action);
};

