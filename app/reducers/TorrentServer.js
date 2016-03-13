/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import Immutable from 'immutable';
import { UPDATE_TORRENT_SERVER } from '../actions/TorrentServer';

export const torrentServer = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case UPDATE_TORRENT_SERVER:
      state = Immutable.fromJS(action.torrentListing);
      return state;

    default:
      return state;

  }
};