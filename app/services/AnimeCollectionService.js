/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';

class AnimeCollectionService extends BaseService {

  async getAnime() {
    try {
      const response = await this.fetchApi('/anime');
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  }

}

export const factory = () => {
  return new AnimeCollectionService();
};
