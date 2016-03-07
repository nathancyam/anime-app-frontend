/**
 * Created by nathanyam on 7/03/2016.
 */

import { hostname, fetchApi } from '../helpers';
import { makeAnnRequest } from '../actions/AnimeNewsNetwork';
import Immutable from 'immutable';

/**
 * @param {Map} collection
 * @param {String} animeId
 * @returns {Object}
 */
function getAnimeFromCollection(collection, animeId) {
  return collection.filter(el => el.get('_id') == animeId)
    .reduce((carry, item) => item);
}

class AnimeItemService {

  /**
   * @param {String} animeId
   */
  constructor(animeId) {
    this.animeId = animeId;
  }

  /**
   * @returns {String}
   */
  getEpisodeUrl() {
    return `${hostname}/episodes/anime/${this.animeId}`;
  }

  getAnimeUrl() {
    return `${hostname}/anime`;
  }

  /**
   * @returns {Promise.<Object>}
   */
  async getAnimeItemData() {
    const promises = [
      this.getAnimeResponse(),
      this.getAnimeEpisodes()
    ];

    const [anime, animeEpisodes ] = await Promise.all(promises);
    const episodes = {
      [this.animeId]: animeEpisodes
    };
    const payload = {
      anime: Immutable.fromJS(anime),
      episodes: Immutable.fromJS(episodes)
    };
    const animeObj = getAnimeFromCollection(payload.anime, this.animeId);
    const annResponse = await makeAnnRequest(animeObj.get('title'));
    const animeNewsNetwork = Immutable.fromJS({
      [this.animeId]: annResponse
    });

    return Object.assign({}, payload, { animeNewsNetwork });
  }

  getAnimeResponse() {
    return AnimeItemService.makeRequest(this.getAnimeUrl());
  }

  getAnimeNewsNetwork() {
    return Promise.resolve({ details: `${this.animeId}aldsfl` });
  }

  getAnimeEpisodes() {
    return AnimeItemService.makeRequest(this.getEpisodeUrl());
  }

  static async makeRequest(url) {
    try {
      let response = await fetchApi(url);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * @param animeId
 * @returns {AnimeItemService}
 */
export const factory = (animeId) => {
  return new AnimeItemService(animeId);
};
