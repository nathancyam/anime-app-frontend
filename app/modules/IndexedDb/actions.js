/**
 * Created by nathan on 6/25/17.
 */

import idb from '../../services/IndexedDbService';

export function saveAnime (anime) {
  return async () => {
    if (navigator && navigator.onLine) {
      await idb.setAnime(anime.toJS());
    }
  };
}
