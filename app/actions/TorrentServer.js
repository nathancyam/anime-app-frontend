/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import { additionFactory } from '../services/EpisodeService';

export const UPDATE_TORRENT_SERVER = 'UPDATE_TORRENT_SERVER ';
export function updateTorrentServer(torrentListing) {
  return {
    type: UPDATE_TORRENT_SERVER,
    torrentListing
  }
}

export const ADD_EPISODE_TO_COLLECTION = 'ADD_EPISODE_TO_COLLECTION ';
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
