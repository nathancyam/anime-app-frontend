/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import Immutable from 'immutable';
import { UPDATE_TORRENT_SERVER, FILTER_TORRENTS_BY_NAME } from '../actions/TorrentServer';

export const torrentServer = (state = Immutable.fromJS({ filter: { name: '' }, list: [] }), action) => {
  switch (action.type) {
    case UPDATE_TORRENT_SERVER:
      state = state.set('list', Immutable.fromJS(action.torrentListing));
      break;

    case FILTER_TORRENTS_BY_NAME:
      state = state.set('filter', Immutable.fromJS({ name: action.value }));
      break;

    default:
      break;
  }

  return state;
};