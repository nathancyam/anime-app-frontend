import Immutable from 'immutable';
import {
  RECEIVED_EPISODES,
  receivedEpisodes,
  fetchAnimeEpisodes
} from '../actions/Episode';

/**
 * @param {Object} state
 * @param {Object} action
 */
export const episodes = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case RECEIVED_EPISODES:
      const episodes = Immutable.fromJS(action.episodes);
      state = state.set(action.animeId, episodes);
      return state;

    default:
      return state;
  }
};