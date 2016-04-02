/**
 * Created by nathanyam on 7/03/2016.
 */
import Immutable from 'immutable';
import {
  IS_FETCHING,
  RECEIVED_ANIME_NEWS_NETWORK_RESPONSE
} from './actions';

export const animeNewsNetwork = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case IS_FETCHING:
      state = state.setIn(['_meta', 'isFetching'], action.value);
      return state;

    case RECEIVED_ANIME_NEWS_NETWORK_RESPONSE:
      state = state.setIn(['_meta', 'isFetching'], false);
      state = state.set(action.animeId, Immutable.fromJS(action.response));
      return state;

    default:
      return state;
  }
};
