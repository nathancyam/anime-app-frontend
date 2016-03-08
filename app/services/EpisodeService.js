/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';

class EpisodeService extends BaseService {

  constructor(animeId) {
    super();
    this.animeId = animeId;
  }

  async getEpisodes() {
    const response = await this.fetchApi(`/episodes/anime/${this.animeId}`);
    const jsonResponse = await response.json();
    return this.makeImmutable(jsonResponse);
  }

}

export const factory = (animeId) => {
  return new EpisodeService(animeId);
};