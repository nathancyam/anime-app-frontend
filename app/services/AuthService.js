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

  async login(email, password) {
    let response = await this.fetchApi(`/auth/jwt/token`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    let json = await response.json();
    const token = json.token;

    response = await this.fetchApi('/auth/jwt/login', {
      method: 'POST',
      headers: {
        jwt: token
      }
    });

    json = await response.json();

    if (typeof document !== 'undefined') {
      document.cookie = `jwt=${token}`;
    }

    return this.makeImmutable(json);
  }

  async logout() {
    try {
      const response = await this.fetchApi('/logout');
      const jsonResponse = await response.json();
      document.cookie = 'jwt=';
      return this.makeImmutable(jsonResponse);
    } catch (err) {
      console.error(err);
    }
  }

  async register(email, password) {
    try {
      const response = await this.fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password })
      });
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  }
}