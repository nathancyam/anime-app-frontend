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
import serviceWorker from '../modules/ServiceWorker/reducer';
import { authMiddleware } from '../middleware/auth';
import idb from '../services/IndexedDbService';

export function configureStore(history, initialState = {}, isClientSide) {
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

  let reducers = {
    routing: routerReducer,
    auth,
    uiMeta,
    anime,
    episodes, torrents,
    torrentServer,
    animeNewsNetwork,
    filters,
  };

  if (isClientSide) {
    reducers.serviceWorker = serviceWorker;
  }

  const reducer = combineReducers(reducers);

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
