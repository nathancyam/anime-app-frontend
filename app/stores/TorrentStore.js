import Reflux from 'reflux';
import Immutable from 'immutable';
import _ from 'lodash';
import { hostname, fetchApi } from './Constants';

const API_BASE_URL = hostname;
const ApiEndPoints = {
  search: `${API_BASE_URL}/nyaatorrents/search?name=`,
  addTorrent: `${API_BASE_URL}/torrent/add`
};

let timer = 0;
let torrentStore = new Immutable.List([]);
let activePage = 1;

function makeTorrentSearchRequest(searchTerm) {
  return new Promise((resolve, reject) => {
    fetchApi(ApiEndPoints.search + searchTerm)
      .then((response) => response.json())
      .then((jsonResponse) => {
        return resolve(jsonResponse);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function addTorrentToServer(torrent) {
  return new Promise((resolve, reject) => {
    fetchApi(ApiEndPoints.addTorrent, {
      method: "POST",
      body: JSON.stringify({ torrentUrl: torrent.href })
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      return resolve(jsonResponse);
    })
    .catch((err) => {
      return reject(err);
    });
  });
}

export var Actions = Reflux.createActions([
  'enterSearchTerm',
  'addTorrent',
  'changeTorrentPagination'
]);

export default Reflux.createStore({
  listenables: [Actions],

  /**
   * @param  {String} searchTerm
   */
  onEnterSearchTerm(searchTerm) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      makeTorrentSearchRequest(searchTerm)
        .then((results) => {
          torrentStore = new Immutable.List(results);
          return this.onChangeTorrentPagination(1);
        });
    }, 500);
  },

  /**
   * @param  {Object} torrent
   */
  onAddTorrent(torrent) {
    let torrentIndex;
    torrentStore.forEach((el, index) => {
      if (el.href === torrent.href) {
        torrentIndex = index;
      }
    });

    let updateFn = (status) => {
      return (value) => {
        return _.assign({}, value, { status });
      };
    };

    torrentStore = torrentStore.update(torrentIndex, updateFn('adding'));

    this.triggerListeners(torrentStore);

    addTorrentToServer(torrent)
      .then(() => {
        torrentStore = torrentStore.update(torrentIndex, updateFn('added'));
        this.triggerListeners(torrentStore);
      })
      .catch((err) => {
        console.log(err);
        torrentStore = torrentStore.update(torrentIndex, updateFn('error'));
        this.triggerListeners(torrentStore);
      });
  },

  /**
   * @param  {Number} page
   */
  onChangeTorrentPagination(page) {
    activePage = page;
    let fromMark = (page - 1) * 10;
    let torrents = torrentStore.skip(fromMark).take(10);
    this.triggerListeners(torrents);
  },

  triggerListeners(results) {
    return this.trigger(
      {
        results,
        activePage,
        numberOfResults: torrentStore.size
      }
    );
  }
});
