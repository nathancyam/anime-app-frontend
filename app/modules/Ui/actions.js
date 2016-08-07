/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

export const MODAL_TORRENT = 'app/Ui/MODAL_TORRENT';
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

export const IMAGE_REGISTRATION = 'IMAGE_REGISTRATION';
export function addImageToRegistry(node) {
  return {
    type: IMAGE_REGISTRATION,
    node
  }
}

export const UPDATE_IMAGE_REGISTRY = 'UPDATE_IMAGE_REGISTRY ';
export function updateImageRegistry() {
  return {
    type: UPDATE_IMAGE_REGISTRY,
    innerHeight: window.innerHeight
  }
}
