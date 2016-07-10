/**
 * Created by nathanyam on 2/04/2016.
 */

"use strict";

import BaseService from './BaseService';

const ANN_SEARCH_URI = `/ann/search`;
const ANN_IMAGE_URI = `/ann/update`;

export default class AnimeNewsNetworkService extends BaseService {

  /**
   * @param {Object} query
   * @param {Boolean} isId
   * @returns {Promise.<Object>}
   */
  async search(query, isId = false) {
    let searchUrl = `${ANN_SEARCH_URI}?${isId ? 'ann_id' : 'name'}=${query}`;
    let response = await this.fetchApi(searchUrl);
    return await response.json();
  }

  /**
   * @param {String} animeId
   * @param {String} animeName
   * @param {String|Boolean} annId
   * @returns {Promise.<Object>}
   */
  async updateImage(animeId, animeName, annId = false) {
    const body = { anime: { _id: animeId, name: animeName }};
    if (annId) {
      body.ann = { annId }
    }

    let response = await this.fetchApi(ANN_IMAGE_URI, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    return await response.json();
  }
}
