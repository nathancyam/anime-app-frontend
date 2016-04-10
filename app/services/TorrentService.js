/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';

const SEARCH_URL = '/nyaatorrents/search?name=';
const ADD_TORRENT_URL = '/torrent/add';
const ASSIGN_TORRENT_TO_ANIME = '/torrent/move/:torrentId/anime/:animeId';
const PAUSE_TORRENT = '/torrent/pause/:torrentId';
const RESUME_TORRENT = '/torrent/resume/:torrentId';
const FORCE_UPDATE_URL = '/torrent/server/update';

class TorrentService extends BaseService {

  /**
   * @param {Object} query
   * @returns {Promise.<Object>}
   */
  async search(query) {
    const response = await this.fetchApi(`${SEARCH_URL}${query}`);
    const jsonResponse = await response.json();
    return this.makeImmutable(jsonResponse);
  }

  /**
   * @param {String} torrentUrl
   * @param {Object} meta
   * @returns {Promise.<Object>}
   */
  async addTorrent(torrentUrl, meta) {
    try {
      const response = await this.fetchApi(ADD_TORRENT_URL, {
        method: 'POST',
        body: JSON.stringify({ torrentUrl, meta })
      });
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * @param torrent
   * @param animeId
   * @returns {Promise.<Object>}
   */
  async assignTorrentToAnime(torrent, animeId) {
    const url = ASSIGN_TORRENT_TO_ANIME
      .replace(':torrentId', torrent.get('id'))
      .replace(':animeId', animeId);
    
    try {
      const response = await this.fetchApi(url, {
        method: 'POST'
      });
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @param torrent
   * @returns {Promise.<Object>}
   */
  async pauseTorrent(torrent) {
    const url = PAUSE_TORRENT
      .replace(':torrentId', torrent.get('id'));

    try {
      const response = await this.fetchApi(url, { method: 'POST' });
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @param torrent
   * @returns {Promise.<Object>}
   */
  async resumeTorrent(torrent) {
    const url = RESUME_TORRENT
      .replace(':torrentId', torrent.get('id'));

    try {
      const response = await this.fetchApi(url, { method: 'POST' });
      const jsonResponse = await response.json();
      return this.makeImmutable(jsonResponse);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @returns {Promise.<Object>}
   */
  async forceUpdateListing() {
    try {
      const response = await this.fetchApi(FORCE_UPDATE_URL, { method: 'POST' });
      return await response.json();
    } catch (err) {
      console.warn('Failed to force update on torrent listing');
    }
  }
}

/**
 * @returns {TorrentService}
 */
export const factory = () => {
  return new TorrentService();
};