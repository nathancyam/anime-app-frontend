import Reflux from 'reflux';
import Immutable from 'immutable';

let anime = new Immutable.List([]);

function getAnime() {
  return new Promise((resolve, reject) => {
    fetch('http://anime.itsme.dio/anime')
      .then((response) => response.json())
      .then((jsonResponse) => {
        return resolve(jsonResponse);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      })
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

    return anime.toArray();
  },

  onGetAll() {
    this.getAnime();
  },

  onFilterByName(name) {
    let filterAnime = anime.filter((el) => {
      return Boolean(el.title.match(new RegExp(`${name}`, 'i')));
    })
    this.trigger(filterAnime);
  },

  onFilterByComplete(isComplete) {

  },

  onFilterByWatching(isWatching) {

  },

  onReset() {
    this.trigger(anime);
  }
});
