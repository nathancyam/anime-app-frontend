import Reflux from 'reflux';
import Immutable from 'immutable';
import _ from 'lodash';

const API_BASE_URL = 'http://anime.itsme.dio';
const ApiEndPoints = {
  search: `${API_BASE_URL}/nyaatorrents/search?name=`,
  addTorrent: `${API_BASE_URL}/torrent/add`
};

let timer = 0;
let torrentStore = new Immutable.List([]);

function makeTorrentSearchRequest(searchTerm) {
  return new Promise((resolve, reject) => {
    fetch(ApiEndPoints.search + searchTerm)
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
    fetch(ApiEndPoints.addTorrent, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
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
  'addTorrent'
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
          this.trigger(torrentStore.toArray());
        });
    }, 500);
  },

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

    this.trigger(torrentStore);

    addTorrentToServer(torrent)
      .then(() => {
        torrentStore = torrentStore.update(torrentIndex, updateFn('added'));
        this.trigger(torrentStore);
      })
      .catch((err) => {
        console.log(err);
        torrentStore = torrentStore.update(torrentIndex, updateFn('error'));
        this.trigger(torrentStore);
      });
  }
});
