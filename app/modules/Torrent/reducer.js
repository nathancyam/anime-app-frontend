/**
 * Created by nathanyam on 8/03/2016.
 */

import Immutable from 'immutable';
import {
  RECEIVED_TORRENTS,
  REQUEST_SEARCH,
  FETCHING_TORRENTS,
  ENTERING_QUERY,
  ADDING_TORRENT,
  ADDED_TORRENT,
  ERROR_ADDING_TORRENT,
  RESET_TORRENT,
  PAGINATION_CHANGE
} from './actions';

const initialState = Immutable.fromJS(
  {
    query: '',
    torrents: [],
    _meta: {
      isFetching: false
    },
    pagination: {
      currentPage: 0,
      itemsPerPage: 10
    }
  }
);

/**
 * @param {String} status
 * @param {Object[]} collection
 * @param {String} torrentHref
 * @returns {*}
 */
const updateTorrentStatus = (status, collection, torrentHref) => {
  return collection
    .map(torrent => {
      if (torrent.get('href') === torrentHref) {
        return torrent.set('status', status);
      }
      return torrent;
    });
};
const addedTorrents = updateTorrentStatus.bind(null, 'added');
const addingTorrents = updateTorrentStatus.bind(null, 'adding');
const errorTorrents = updateTorrentStatus.bind(null, 'error');

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      state = state.set('torrents', Immutable.List());
      return state;

    case RECEIVED_TORRENTS:
      state = state.setIn(['_meta', 'isFetching'], false);
      state = state.set('torrents', action.torrents);
      return state;

    case FETCHING_TORRENTS:
      state = state.setIn(['_meta', 'isFetching'], action.value);
      return state;

    case ENTERING_QUERY:
      state = state.set('query', action.query);
      return state;

    case ADDING_TORRENT:
      state = state.set('torrents', addingTorrents(
        state.get('torrents'),
        action.torrent.get('href')
      ));
      return state;

    case ADDED_TORRENT:
      state = state.set('torrents', addedTorrents(
        state.get('torrents'),
        action.torrent.get('href')
      ));
      return state;

    case ERROR_ADDING_TORRENT:
      state = state.set('torrents', errorTorrents(
        state.get('torrents'),
        action.torrent.get('href')
      ));
      return state;

    case RESET_TORRENT:
      state = state.set('torrents', Immutable.List());
      state = state.set('query', '');
      return state;

    case PAGINATION_CHANGE:
      state = state.setIn(['pagination', 'currentPage'], action.pageNumber);
      return state;

    default:
      return state;
  }
};
