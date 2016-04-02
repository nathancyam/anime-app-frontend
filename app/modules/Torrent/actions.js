/**
 * Created by nathanyam on 8/03/2016.
 */

import { factory } from '../../services/TorrentService';
import debounce from 'lodash/debounce';

const _search = debounce((dispatch, query) => {
  factory()
    .search(query)
    .then(torrents => {
      dispatch(receivedTorrents(torrents));
    })
}, 2000);

export const REQUEST_SEARCH = 'app/Torrent/REQUEST_SEARCH';
export function searchTorrents(query) {
  return dispatch => {
    dispatch(enteringQuery(query));
    dispatch(fetchingTorrents(true));
    _search(dispatch, query);
  };
}

export const RECEIVED_TORRENTS = 'app/Torrent/RECEIVED_TORRENTS';
export function receivedTorrents(torrents) {
  return {
    type: RECEIVED_TORRENTS,
    torrents
  }
}

export const FETCHING_TORRENTS = 'app/Torrent/FETCHING_TORRENTS';
export function fetchingTorrents(value) {
  return {
    type: FETCHING_TORRENTS,
    value
  };
}

export function addTorrent(torrent) {
  return dispatch => {
    dispatch(addingTorrent(torrent));
    factory()
      .addTorrent(torrent.get('href'), { name: torrent.get('name') })
      .then(() => {
        dispatch(addedTorrent(torrent));
      })
      .catch(error => dispatch(errorAddingTorrent(error, torrent)));
  };
}

export const ERROR_ADDING_TORRENT = 'app/Torrent/ERROR_ADDING_TORRENT';
export function errorAddingTorrent(error, torrent) {
  return {
    type: ERROR_ADDING_TORRENT,
    error,
    torrent
  }
}

export const ADDING_TORRENT = 'app/Torrent/ADDING_TORRENT';
export function addingTorrent(torrent) {
  return {
    type: ADDING_TORRENT,
    torrent
  };
}

export const ADDED_TORRENT = 'ADDED_TORRENT';
export function addedTorrent(torrent) {
  return {
    type: ADDED_TORRENT,
    torrent
  };
}

export const ENTERING_QUERY = 'ENTERING_QUERY';
export function enteringQuery(query) {
  return {
    type: ENTERING_QUERY,
    query
  }
}

export const RESET_TORRENT = 'RESET_TORRENT';
export function resetTorrents() {
  return {
    type: RESET_TORRENT
  }
}
