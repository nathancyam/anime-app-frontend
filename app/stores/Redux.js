/**
 * Created by nathanyam on 6/03/2016.
 */

import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { anime, filters } from '../reducers/AnimeCollection';
import { user } from '../reducers/Auth';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    routing: routerReducer,
    anime,
    filters,
    user
  });

  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history)
      )
    )
  );
}
