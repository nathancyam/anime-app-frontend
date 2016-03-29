/**
 * Created by nathanyam on 29/03/2016.
 */

"use strict";

import BaseService from './BaseService';

export default class AuthService extends BaseService {

  async getUser(headers = {}) {
    try {
      const response = await this.fetchApi('/user', { headers });
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (err) {
      console.error(err);
    }
  }

  async logout() {
    try {
      const response = await this.fetchApi('/logout');
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (err) {
      console.error(err);
    }
  }
  
}