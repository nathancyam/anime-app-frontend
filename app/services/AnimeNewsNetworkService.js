/**
 * Created by nathanyam on 2/04/2016.
 */

"use strict";

import BaseService from './BaseService';

const ANN_SEARCH_URI = `/ann/search`;

export default class AnimeNewsNetworkService extends BaseService {

  /**
   * @param query
   * @param {Boolean} isId
   * @returns {Promise.<Object>}
   */
  async search(query, isId = false) {
    let searchUrl = `${ANN_SEARCH_URI}?${isId ? 'ann_id' : 'name'}=${query}`;
    let response = await this.fetchApi(searchUrl);
    return await response.json();
  }

}
