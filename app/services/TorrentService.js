/**
 * Created by nathanyam on 8/03/2016.
 */

import BaseService from './BaseService';

class TorrentService extends BaseService {
  async search(query) {
    let result = await this.fetchApi()
  }
}

export const factory = () => {
  return new TorrentService();
};