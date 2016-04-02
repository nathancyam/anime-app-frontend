/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import Immutable from 'immutable';
import {
  MODAL_TORRENT
} from './actions';

const initialState = {
  modal: {
    torrent: {
      state: 'hide'
    }
  }
};

export const uiMeta = (state = Immutable.fromJS(initialState), action) => {
  switch (action.type) {

    case MODAL_TORRENT:
      state = state.setIn(['modal', 'torrent', 'state'], action.state);
      if (action.data) {
        state = state.setIn(['modal', 'torrent', 'data'], action.data);
      }
      return state;

    default:
      return state;
  }
};