/**
 * Created by nathanyam on 6/03/2016.
 */

import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import anime from '../modules/AnimeCollection/reducer';
import filters from '../modules/AnimeCollection/filter';
import auth from '../modules/Auth/reducer';
import episodes from '../modules/Episode/reducer';
import animeNewsNetwork from '../modules/AnimeNewsNetwork/reducer';
import torrents from '../modules/Torrent/reducer';
import torrentServer from '../modules/TorrentServer/reducer';
import uiMeta, { defaultState as uiDefaultState } from '../modules/Ui/reducer';
import { authMiddleware } from '../middleware/auth';

export function configureStore(history, initialState = {}) {
  let newState = initialState;
  const immutableState = ['anime', 'episodes', 'animeNewsNetwork', 'torrents', 'auth'];

  if (initialState) {
    const updateState = Object.keys(initialState)
      .filter(el => immutableState.includes(el))
      .reduce((carry, item) => {
        carry[item] = Immutable.fromJS(initialState[item]);
        return carry;
      }, {});

    newState = Object.assign({}, initialState, updateState);
  }

  const reducer = combineReducers({
    routing: routerReducer,
    auth,
    uiMeta,
    anime,
    episodes, torrents,
    torrentServer,
    animeNewsNetwork,
    filters
  });

  return createStore(
    reducer,
    newState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        authMiddleware(history)
      )
    )
  );
}
