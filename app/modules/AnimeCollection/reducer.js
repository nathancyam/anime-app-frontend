import Immutable from 'immutable';
import {
  FETCH_ANIME,
  RECEIVED_ANIME,
  FILTER_BY_COMPLETE,
  FILTER_ANIME_BY_NAME,
  FILTER_BY_WATCHING
} from './actions';

import {
  SAVED_ANIME
} from '../AnimeItem/actions';

/**
 * @param {Map} state
 * @param {Object} action
 * @returns {*|any|Map<K, V>|Map<string, V>}
 */
export default function reducer(state = Immutable.fromJS({ isFetching: false, anime: [] }), action) {
  switch (action.type) {
    case FETCH_ANIME:
      state = state.set('isFetching', true);
      return state;

    case RECEIVED_ANIME:
      state = state.set('isFetching', false);
      state = state.set('anime', action.anime);
      return state;

    case SAVED_ANIME:
      let anime = state.get('anime');
      anime = anime.map(el => {
        if (el.get('_id') === action.anime.get('_id')) {
          return action.anime;
        }
        return el;
      });
      state = state.set('anime', Immutable.fromJS(anime));
      return state;

    default:
      return state;
  }
};

