/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';

const SEARCH_URL = '/nyaatorrents/search?name=';
const ADD_TORRENT_URL = '/torrent/add';
const ASSIGN_TORRENT_TO_ANIME = '/torrent/:torrentId/anime/:animeId';

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
}

export const factory = () => {
  return new TorrentService();
};