/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

/**
 * @typedef {Object} ToastNotification
 * @property {string} type - Notification type
 * @property {string} msg - Notification message
 */

const PUSH_TOAST_TIMEOUT = 3000;

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
  };
}

export const UPDATE_IMAGE_REGISTRY = 'UPDATE_IMAGE_REGISTRY ';
export function updateImageRegistry() {
  return {
    type: UPDATE_IMAGE_REGISTRY,
    innerHeight: window.innerHeight
  };
}

export const ADD_TOAST_NOTIFICATION = 'ui/ADD_TOAST_NOTIFICATION';
function addToastNotification({ type, msg }) {
  return {
    type: ADD_TOAST_NOTIFICATION,
    payload: { type, msg }
  };
}

export const CLEAR_TOAST_NOTIFICATION = 'ui/CLEAR_TOAST_NOTIFICATION';
function clearToastNotification() {
  return {
    type: CLEAR_TOAST_NOTIFICATION
  };
}

/**
 * @param {ToastNotification} notification
 * @return {function(*)}
 */
export function pushNewNotification(notification) {
  return dispatch => {
    dispatch(addToastNotification(notification));
    setTimeout(() => dispatch(clearToastNotification()), PUSH_TOAST_TIMEOUT);
  };
}
