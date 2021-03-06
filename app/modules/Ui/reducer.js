/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import Immutable from 'immutable';
import {
  MODAL_TORRENT,
  IMAGE_REGISTRATION,
  UPDATE_IMAGE_REGISTRY,
  ADD_TOAST_NOTIFICATION,
  CLEAR_TOAST_NOTIFICATION,
  SW_INSTALLED,
} from './actions';

const initialState = {
  modal: {
    torrent: {
      state: 'hide'
    }
  },
  imageRegistry: [],
  toastNotifications: []
};

export const defaultState = Immutable.fromJS(initialState);

export default function reducer(state = Immutable.fromJS(initialState), action) {
  switch (action.type) {

    case MODAL_TORRENT: {
      state = state.setIn(['modal', 'torrent', 'state'], action.state);
      if (action.data) {
        state = state.setIn(['modal', 'torrent', 'data'], action.data);
      }
      break;
    }

    case IMAGE_REGISTRATION: {
      let imageRegistry = state.get('imageRegistry');
      imageRegistry = imageRegistry.push({
        node: action.node,
        isVisible: false
      });

      imageRegistry = Immutable.fromJS(imageRegistry);
      state = state.set('imageRegistry', imageRegistry);
      break;
    }

    case UPDATE_IMAGE_REGISTRY: {
      state = state.updateIn(['imageRegistry'], imageRegistry => {
        return imageRegistry.map(({ node }) => ({
          node,
          isVisible: (window.innerHeight + 500) > node.getBoundingClientRect().top
        }));
      });
      break;
    }

    case SW_INSTALLED:
    case ADD_TOAST_NOTIFICATION: {
      state = state.updateIn(['toastNotifications'], notifications => {
        return notifications.concat([ action.payload ]);
      });
      break;
    }

    case CLEAR_TOAST_NOTIFICATION: {
      state = state.updateIn(['toastNotifications'], notifications => Immutable.List());
      break;
    }

    default:
      break;
  }

  return state;
};
