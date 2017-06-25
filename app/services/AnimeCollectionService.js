/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';
import idb from './IndexedDbService';

class AnimeCollectionService extends BaseService {

  async getAnime() {
    if (navigator && !navigator.onLine) {
      const anime = await idb.getAllAnime();
      return this.makeImmutable(anime);
    }

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
