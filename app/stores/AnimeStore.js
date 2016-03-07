import Reflux from 'reflux';
import Immutable from 'immutable';
import _ from 'lodash';
import { hostname, fetchApi } from './Constants';

let anime = new Immutable.List([]);

let filters = {};
let generateFilter = (filterProp, filterValue, predicateFn) => {
  if (predicateFn) {
    filters[filterProp] = predicateFn;
  } else {
    filters[filterProp] = (el) => {
      return el[filterProp] === filterValue;
    };
  }
};

export function getAnime() {
  if (typeof window !== 'undefined') {
    __INITIAL_DATA__ = __INITIAL_DATA__ || {};
    if (__INITIAL_DATA__.animeStore) {
      return Promise.resolve(__INITIAL_DATA__.animeStore);
    }
  }

  return new Promise((resolve, reject) => {
    fetchApi(`${hostname}/anime`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        return resolve(jsonResponse);
      })
      .catch((err) => {
        console.error(err);
        return reject(err);
      });
  });
}

export var Actions = Reflux.createActions([
  'filterByName',
  'filterByComplete',
  'filterByWatching',
  'resetAnimeById',
  'reset',
  'forceUpdate',
  'getAll'
]);

/**
 * Sorts the anime list alphabetically
 */
function sortAnimeAlpha() {
  anime = anime.sort((firstEl, secondEl) => {
    if (firstEl.title < secondEl.title) {
      return -1;
    }
    if (firstEl.title > secondEl.title) {
      return 1;
    }
    return 0;
  });
}

export default Reflux.createStore({
  listenables: [Actions],

  getAnime(forceReload) {
    if (anime.size === 0 || forceReload) {
      getAnime()
        .then((result) => {
          anime = new Immutable.List(result);
          sortAnimeAlpha();
          this.trigger(anime.toArray());
        });
    }

    return this.trigger(anime.toArray());
  },

  onGetAll() {
    this.getAnime();
  },

  onForceUpdate() {
    this.getAnime(true);
  },

  triggerFilterAnime() {
    let filterCollection = _.values(filters)
      .reduce((prev, curr) => {
        return prev.filter(curr);
      }, anime);

    this.trigger(filterCollection);
  },

  onFilterByName(name) {
    generateFilter('title', '', (el) => {
      return Boolean(el.title.match(new RegExp(`${name}`, 'i')));
    });
    this.triggerFilterAnime();
  },

  setBooleanFilter(property, value) {
    if (value === "") {
      delete filters[property];
      return this.triggerFilterAnime();
    }

    if (value === "true") {
      generateFilter(property, true);
    } else {
      generateFilter(property, undefined);
    }

    return this.triggerFilterAnime();
  },

  onFilterByComplete(isComplete) {
    this.setBooleanFilter('is_complete', isComplete);
  },

  onFilterByWatching(isWatching) {
    this.setBooleanFilter('is_watching', isWatching);
  },

  onResetAnimeById(id) {
    anime = anime.filter((anime) => anime._id !== id);
    this.trigger(anime);

    return getAnime()
      .then((jsonResponse) => {
        let replaceAnime = jsonResponse.filter((animeItem) => animeItem._id === id).shift();
        anime = anime.unshift(replaceAnime);
        sortAnimeAlpha();
        this.trigger(anime);
      });
  },

  onReset() {
    filters = {};
    this.trigger(anime);
  }
});
