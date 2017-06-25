/**
 * Created by nathanyam on 7/03/2016.
 */

import { hostname, fetchApi as _fetchApi } from '../helpers';
import Immutable from 'immutable';

export default class {

  constructor() {
    this.hostname = hostname;
  }

  getJwt() {
    if (typeof document !== 'undefined') {
      return localStorage.getItem('jwt');
    }

    return false;
  }

  /**
   * @param url
   * @param body
   * @returns {Promise.<Object>}
   */
  fetchApi(url, body = {}) {
    let authHeader = {};
    const jwt = this.getJwt();

    if (jwt) {
      authHeader = Object.assign({}, { jwt });
    }

    return _fetchApi(url, body, authHeader);
  }

  makeImmutable(jsObject) {
    return Immutable.fromJS(jsObject);
  }
}

