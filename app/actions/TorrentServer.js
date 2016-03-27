/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import { additionFactory } from '../services/EpisodeService';
import { factory as TorrentFactory } from '../services/TorrentService';

export const UPDATE_TORRENT_SERVER = 'UPDATE_TORRENT_SERVER';
export function updateTorrentServer(torrentListing) {
  return {
    type: UPDATE_TORRENT_SERVER,
    torrentListing
  }
}

export const ADD_EPISODE_TO_COLLECTION = 'ADD_EPISODE_TO_COLLECTION';
export function addEpisodeToCollection(torrent) {
  return dispatch => {
    additionFactory()
      .addEpisodeToCollection(torrent)
      .then(response => dispatch(addedEpisodeToCollection(torrent)))
      .catch(err => console.error(err));
  }
}

export const ADDED_EPISODE_TO_COLLECTION = 'ADDED_EPISODE_TO_COLLECTION';
export function addedEpisodeToCollection(torrent) {
  return {
    type: ADD_EPISODE_TO_COLLECTION,
    torrent
  }
}

export const FILTER_TORRENTS_BY_NAME = 'FILTER_TORRENTS_BY_NAME';
export function filterByName(name) {
  return {
    type: FILTER_TORRENTS_BY_NAME,
    value: name
  }
}

export const SORT_TORRENTS_BY_FIELD = 'SORT_TORRENTS_BY_FIELD';
export function sortTorrents(field, order) {
  return {
    type: SORT_TORRENTS_BY_FIELD,
    field,
    order
  }
}

export function assignToAnime(torrent, animeId) {
  console.log(torrent);
  console.log(animeId);
  return dispatch => {
    TorrentFactory()
      .assignTorrentToAnime(torrent, animeId)
      .then(resp => {
      });
  };
}

export function pauseTorrent(torrent) {
  return dispatch => {
    TorrentFactory()
      .pauseTorrent(torrent)
      .then(resp => console.log('Paused torrent, waiting on refresh'))
      .catch(err => console.error('Failed to pause torrent'));
  };
}

export function resumeTorrent(torrent) {
  return dispatch => {
    TorrentFactory()
      .resumeTorrent(torrent)
      .then(resp => console.log('Resumed torrent, waiting on refresh'))
      .catch(err => console.error('Failed to resume torrent'));
  };
}
