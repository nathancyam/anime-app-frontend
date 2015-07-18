import Reflux from 'reflux';
import Immutable from 'immutable';

let animeItems = new Immutable.Map({});

export var Actions = Reflux.createActions([
  'findById',
  'reset'
]);

/**
 * @param {String} url
 * @returns {Promise}
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonResponse) => {
        return resolve(jsonResponse);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

/**
 * @param {Number} id
 * @returns {Promise}
 */
function getAnimeItem(id) {
  return makeRequest(`http://anime.itsme.dio/anime/${id}`);
}

/**
 * @param {Number} id
 * @returns {Promise}
 */
function getAnimeEpisodes(id) {
  return makeRequest(`http://anime.itsme.dio/episodes/anime/${id}`);
}

export default Reflux.createStore({
  listenables: [Actions],

  onReset(id) {
    animeItems = animeItems.remove(id);
    return Actions.findById(id);
  },

  onFindById(id) {
    let anime = animeItems.get(id) || {};
    if (!_.isEmpty()) {
      return this.trigger(anime);
    }

    getAnimeItem(id)
      .then((response) => {
        anime = _.assign(anime, response);
        return getAnimeEpisodes(id);
      })
      .then((episodes) => {
        anime = _.assign(anime, { episodes });
        animeItems.set(id, anime);
        this.trigger(anime);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
