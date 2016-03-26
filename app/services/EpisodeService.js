/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';

class EpisodeService extends BaseService {

  constructor(animeId) {
    super();
    this.animeId = animeId;
  }

  /**
   * @returns {string}
   */
  getUrl() {
    if (!this.animeId) {
      return `/episodes`;
    }
    
    return `/episodes/anime/${this.animeId}`;
  }

  /**
   * @returns {Promise.<Object>}
   */
  async getEpisodes() {
    const response = await this.fetchApi(this.getUrl());
    const jsonResponse = await response.json();
    return this.makeImmutable(jsonResponse);
  }

}

class EpisodeAdditionService extends BaseService {

  /**
   * @param {Map} torrent
   * @returns {Promise.<Map>}
   */
  async addEpisodeToCollection(torrent) {
    const response = await this.fetchApi(`/episode/download`,
      {
        method: 'POST',
        body: JSON.stringify({ filename: torrent.get('name') })
      }
    );

    const jsonResponse = await response.json();
    return this.makeImmutable(jsonResponse);
  }
}

export const factory = (animeId) => {
  return new EpisodeService(animeId);
};

export const additionFactory = () => {
  return new EpisodeAdditionService();
};