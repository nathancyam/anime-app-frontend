/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import BaseService from './BaseService';
import io from 'socket.io-client';

let instance = false;

class WebsocketService extends BaseService {

  constructor() {
    super();
    this.handlers = [];
  }

  /**
   * @param {String} event
   * @param {Function} handler
   */
  addListener(event, handler) {
    this.handlers.push({
      event,
      handler
    });
  }

  connect() {
    this.socket = io();
    this.attachListeners();
  }

  attachListeners() {
    this.handlers.forEach(handlerObj => {
      this.socket.on(handlerObj.event, handlerObj.handler);
    });
  }
}

export const factory = () => {
  if (!instance) {
    instance = new WebsocketService();
  }

  return instance;
};