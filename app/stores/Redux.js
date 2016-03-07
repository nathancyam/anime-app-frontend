/**
 * Created by nathanyam on 6/03/2016.
 */

import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { anime, filters } from '../reducers/AnimeCollection';
import { user } from '../reducers/Auth';
import { episodes } from '../reducers/Episode';
import { animeNewsNetwork } from '../reducers/AnimeNewsNetwork';
import Immutable from 'immutable';

export function configureStore(history, initialState) {
  let newState = initialState;
  const immutableState = ['anime', 'episodes', 'animeNewsNetwork'];

  const reducer = combineReducers({
    routing: routerReducer,
    anime,
    episodes,
    animeNewsNetwork,
    filters,
    user
  });

  if (initialState) {
    const updateState = Object.keys(initialState)
      .filter(el => immutableState.indexOf(el) !== -1)
      .reduce((carry, item) => {
        carry[item] = Immutable.fromJS(initialState[item]);
        return carry;
      }, {});

    newState = Object.assign({}, initialState, updateState);
  }

  return createStore(
    reducer,
    newState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history)
      )
    )
  );
}
