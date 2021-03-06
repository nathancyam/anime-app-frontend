import Immutable from 'immutable';
import {
  RECEIVED_EPISODES,
  RECEIVED_ALL_EPISODES
} from './actions';

/**
 * @param {Object} state
 * @param {Object} action
 */
export default function reducer(state = Immutable.Map(), action) {
  let episodes = {};

  switch (action.type) {
    case RECEIVED_EPISODES:
      episodes = Immutable.fromJS(action.episodes);
      state = state.set(action.animeId, episodes);
      return state;

    case RECEIVED_ALL_EPISODES:
      episodes = Immutable.fromJS(action.episodes);
      state = episodes;
      return state;

    default:
      return state;
  }
}