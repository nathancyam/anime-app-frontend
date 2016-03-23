/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';

const SEARCH_URL = '/nyaatorrents/search?name=';
const ADD_TORRENT_URL = '/torrent/add';

class TorrentService extends BaseService {
  async search(query) {
    const response = await this.fetchApi(`${SEARCH_URL}${query}`);
    const jsonResponse = await response.json();
    return this.makeImmutable(jsonResponse);
  }

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
}

export const factory = () => {
  return new TorrentService();
};