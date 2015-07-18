import Reflux from 'reflux';
import Immutable from 'immutable';
import _ from 'lodash';
import { hostname } from './Constants';

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

function getAnime() {
  return new Promise((resolve, reject) => {
    fetch(`${hostname}/anime`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        return resolve(jsonResponse);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  });
}

export var Actions = Reflux.createActions([
  'filterByName',
  'filterByComplete',
  'filterByWatching',
  'reset',
  'getAll'
]);

export default Reflux.createStore({
  listenables: [Actions],

  getAnime() {
    if (anime.size === 0) {
      getAnime()
        .then((result) => {
          anime = new Immutable.List(result);
          anime = anime.sort((firstEl, secondEl) => {
            if (firstEl.title < secondEl.title) {
              return -1;
            }
            if (firstEl.title > secondEl.title) {
              return 1;
            }
            return 0;
          });

          this.trigger(anime.toArray());
        });
    }

    return this.trigger(anime.toArray());
  },

  onGetAll() {
    this.getAnime();
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

  onReset() {
    filters = {};
    this.trigger(anime);
  }
});
