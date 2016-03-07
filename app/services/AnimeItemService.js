/**
 * Created by nathanyam on 7/03/2016.
 */

import { hostname, fetchApi } from '../helpers';
import Immutable from 'immutable';

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
  getAnimeItemData() {
    return new Promise((resolve, reject) => {
      const promises = [
        this.getAnimeResponse(),
        this.getAnimeEpisodes()
      ];

      Promise.all(promises)
        .then(results => {
          const [ anime, animeEpisodes ] = results;
          const episodes = {
            [this.animeId]: animeEpisodes
          };

          const payload = {
            anime: Immutable.fromJS(anime),
            episodes: Immutable.fromJS(episodes)
          };
          return resolve(payload);
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    })
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
