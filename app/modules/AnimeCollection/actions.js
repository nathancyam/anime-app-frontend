/**
 * Created by nathanyam on 6/03/2016.
 */
import ServiceLocator from '../../services';

export const FETCH_ANIME = 'FETCH_ANIME';
export function fetchAnime() {
  return dispatch => {
    return ServiceLocator
      .make('AnimeCollection')
      .getAnime()
      .then(result => {
        dispatch(receivedAnime(result));
      })
  };
}

export const RECEIVED_ANIME = 'app/AnimeCollection/RECEIVED_ANIME';
export function receivedAnime(collection) {
  return {
    type: RECEIVED_ANIME,
    anime: collection
  };
}

export const FILTER_ANIME_BY_NAME = 'app/AnimeCollection/FILTER_ANIME_BY_NAME';
export function filterByName(name) {
  return {
    type: FILTER_ANIME_BY_NAME,
    name
  };
}

export const FILTER_BY_COMPLETE = 'app/AnimeCollection/FILTER_BY_COMPLETE';
export function filterByComplete(active) {
  return {
    type: FILTER_BY_COMPLETE,
    active
  };
}

export const FILTER_BY_WATCHING = 'app/AnimeCollection/FILTER_BY_WATCHING';
export function filterByWatching(active) {
  return {
    type: FILTER_BY_WATCHING,
    active
  };
}
