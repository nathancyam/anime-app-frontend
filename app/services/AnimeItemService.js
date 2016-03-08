/**
 * Created by nathanyam on 7/03/2016.
 */

import BaseService from './BaseService';
import { factory as torrentService} from './TorrentService';
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
    this.torrentService = torrentService();
    this.animeId = animeId;
  }

  /**
   * @returns {String}
   */
  getEpisodeUrl() {
    return `/episodes/anime/${this.animeId}`;
  }

  /**
   * Only should run on the server. Needs to return an object that is a subset of the state reducer.
   *
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
      anime: this.makeImmutable({ isFetching: false, anime: anime }),
      episodes: this.makeImmutable(episodes)
    };

    const animeObj = getAnimeFromCollection(payload.anime.get('anime'), this.animeId);
    const title = animeObj.get('title');
    const torrentListing = await this.torrentService.search(title);
    const torrents = this.makeImmutable({
      _meta: { isFetching: false },
      torrents: torrentListing,
      query: title
    });
    const annResponse = await makeAnnRequest(title);
    const animeNewsNetwork = this.makeImmutable({
      [this.animeId]: annResponse
    });

    return Object.assign({}, payload, { animeNewsNetwork }, { torrents });
  }

  getAnimeResponse() {
    return this.makeRequest('/anime');
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
