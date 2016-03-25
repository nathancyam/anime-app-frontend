/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import Immutable from 'immutable';
import { UPDATE_TORRENT_SERVER, FILTER_TORRENTS_BY_NAME, SORT_TORRENTS_BY_FIELD } from '../actions/TorrentServer';

const defaultOptions = {
  sort: {
    field: 'percentDone',
    order: 'asc'
  },
  list: [],
  filter: {
    name: ''
  }
};

export const torrentServer = (state = Immutable.fromJS(defaultOptions), action) => {
  switch (action.type) {
    case UPDATE_TORRENT_SERVER:
      const immutableListing = Immutable.fromJS(action.torrentListing);
      state = state.set('list', immutableListing);
      break;

    case FILTER_TORRENTS_BY_NAME:
      state = state.set('filter', Immutable.fromJS({ name: action.value }));
      break;

    case SORT_TORRENTS_BY_FIELD:
      state = state.set('sort', Immutable.fromJS({ field: action.field, order: action.order }));
      break;

    default:
      break;
  }

  return state;
};