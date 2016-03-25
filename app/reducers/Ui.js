/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import Immutable from 'immutable';
import {
  MODAL_TORRENT
} from '../actions/Ui'

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
      return state;

    default:
      return state;
  }
};