/**
 * Created by nathanyam on 7/03/2016.
 */

import { hostname, fetchApi as _fetchApi } from '../helpers';
import Immutable from 'immutable';

export default class {

  constructor() {
    this.hostname = hostname;
  }

  /**
   * @param url
   * @param headers
   * @returns {Promise.<Object>}
   */
  fetchApi(url, headers = {}) {
    return _fetchApi(url, headers);
  }

  makeImmutable(jsObject) {
    return Immutable.fromJS(jsObject);
  }
}

