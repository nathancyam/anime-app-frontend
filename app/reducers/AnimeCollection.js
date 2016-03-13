import Immutable from 'immutable';
import {
  FETCH_ANIME,
  RECEIVED_ANIME,
  FILTER_BY_COMPLETE,
  FILTER_ANIME_BY_NAME,
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
 * A filter factory function that uses a closure to wrap the key and predicate
 * function around the object that we check for a truthy or falsey value.
 *
 * @param key
 * @param predicateFn
 * @returns {Function}
 */
const filterFunc = (key, predicateFn) => {
  return filterableObj => {
    return filterableObj.has(key) && predicateFn(filterableObj.get(key));
  };
};

/**
 * @param {Map} state
 * @param {Object} action
 * @returns {*|any|Map<K, V>|Map<string, V>}
 */
export const filters = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case FILTER_BY_COMPLETE:
      state = state.set('is_complete', Immutable.fromJS({
        value: action.active,
        predicate: filterFunc('is_complete', filterObj => filterObj.toString() === action.active)
      }));
      break;

    case FILTER_ANIME_BY_NAME:
      state = state.set('title', Immutable.fromJS({
        value: action.name,
        predicate: filterFunc('title', filterObj => {
          return filterObj.toLowerCase().indexOf(action.name.toLowerCase()) !== -1;
        })
      }));
      break;

    case FILTER_BY_WATCHING:
      state = state.set('is_watching', Immutable.fromJS({
        value: action.active,
        predicate: filterFunc('is_watching', filterObj => filterObj.toString() === action.active)
      }));
      break;

    default:
      break;
  }

  return Immutable.fromJS(state);
};

