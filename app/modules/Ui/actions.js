/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

export const MODAL_TORRENT = 'MODAL_TORRENT';
export const showTorrentModal = (data) => {
  return {
    type: MODAL_TORRENT,
    state: 'show',
    data
  };
};


export const hideTorrentModal = () => {
  return {
    type: MODAL_TORRENT,
    state: 'hide'
  };
};
