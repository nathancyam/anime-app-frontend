/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

export const MODAL_TORRENT = 'MODAL_TORRENT';
export const showTorrentModal = () => {
  return {
    type: MODAL_TORRENT,
    state: 'show'
  };
};


export const hideTorrentModal = () => {
  return {
    type: MODAL_TORRENT,
    state: 'hide'
  };
};
