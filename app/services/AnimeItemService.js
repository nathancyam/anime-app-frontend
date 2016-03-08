/**
 * Created by nathanyam on 7/03/2016.
 */

import BaseService from './BaseService';
import { makeAnnRequest } from '../actions/AnimeNewsNetwork';

/**
 * @param {Map} collection
 * @param {String} animeId
 * @returns {Object}
 */
function getAnimeFromCollection(collection, animeId) {
  return collection.filter(el => el.get('_id') == animeId)
    .reduce((carry, item) => item);
}

class AnimeItemService extends BaseService {

  /**
   * @param {String} animeId
   */
  constructor(animeId) {
    super();
    this.animeId = animeId;
  }

  /**
   * @returns {String}
   */
  getEpisodeUrl() {
    return `/episodes/anime/${this.animeId}`;
  }

  getAnimeUrl() {
    return `/anime`;
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
      anime: this.makeImmutable(anime),
      episodes: this.makeImmutable(episodes)
    };

    const animeObj = getAnimeFromCollection(payload.anime, this.animeId);
    const annResponse = await makeAnnRequest(animeObj.get('title'));
    const animeNewsNetwork = this.makeImmutable({
      [this.animeId]: annResponse
    });

    return Object.assign({}, payload, { animeNewsNetwork });
  }

  getAnimeResponse() {
    return this.makeRequest(this.getAnimeUrl());
  }

  getAnimeEpisodes() {
    return this.makeRequest(this.getEpisodeUrl());
  }

  async makeRequest(url) {
    try {
      let response = await this.fetchApi(url);
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
