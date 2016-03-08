/**
 * Created by nathanyam on 6/03/2016.
 */
import { factory } from '../services/AnimeCollectionService';

export const FETCH_ANIME = 'FETCH_ANIME';
export function fetchAnime() {
  return dispatch => {
    factory()
      .getAnime()
      .then(result => {
        dispatch(receivedAnime(result));
      })
  };
}

export const RECEIVED_ANIME = 'RECEIVED_ANIME';
export function receivedAnime(collection) {
  return {
    type: RECEIVED_ANIME,
    anime: collection
  };
}

export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export function filterByName(name) {
  return {
    type: FILTER_BY_NAME,
    name
  };
}

export const FILTER_BY_COMPLETE = 'FILTER_BY_COMPLETE';
export function filterByComplete(active) {
  return {
    type: FILTER_BY_COMPLETE,
    active
  };
}

export const FILTER_BY_WATCHING = 'FILTER_BY_WATCHING';
export function filterByWatching(active) {
  return {
    type: FILTER_BY_WATCHING,
    active
  };
}
