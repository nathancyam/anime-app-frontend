import Immutable from 'immutable';
import {
  FETCH_ANIME,
  RECEIVED_ANIME,
  FILTER_BY_COMPLETE,
  FILTER_BY_NAME,
  FILTER_BY_WATCHING
} from '../actions/AnimeCollection';

/**
 * @param {Map} state
 * @param {Object} action
 * @returns {*|any|Map<K, V>|Map<string, V>}
 */
export const anime = (state = Immutable.fromJS({ isFetching: false, anime: [] }), action) => {
  switch (action.type) {
    case FETCH_ANIME:
      state = state.set('isFetching', true);
      return state;

    case RECEIVED_ANIME:
      state = state.set('isFetching', false);
      state = state.set('anime', action.anime);
      return state;

    default:
      return state;
  }
};

/**
 * @param {Map} state
 * @param {Object} action
 * @returns {*|any|Map<K, V>|Map<string, V>}
 */
export const filters = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case FILTER_BY_COMPLETE:
      state = state.set('is_complete', action.active);
      return state;

    case FILTER_BY_NAME:
      state = state.set('name', action.name);
      return state;

    case FILTER_BY_WATCHING:
      state = state.set('is_watching', action.active);
      return state;

    default:
      return state;
  }
};

