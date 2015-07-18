import Reflux from 'reflux';
import Immutable from 'immutable';

let animeItems = new Immutable.Map({});

export var Actions = Reflux.createActions([
  'findById',
  'reset',
  'saveAnime'
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
 * @param {Object} anime
 * @returns {Object}
 */
async function saveAnime(anime) {
  try {
    let response = await fetch('http://anime.itsme.dio/anime',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(anime)
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
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
  return makeRequest(`http://anime.itsme.dio/episodes/anime/${id}`).
    then((episodes) => {
      return Promise.resolve({ episodes });
    });
}

export default Reflux.createStore({
  listenables: [Actions],

  /**
   * @param {String} id
   */
  onReset(id) {
    animeItems = animeItems.remove(id);
    return Actions.findById(id);
  },

  /**
   * @param {Object} anime
   */
  async onSaveAnime(anime) {
    await saveAnime(anime);
    Actions.reset(anime._id);
  },

  /**
   * Find anime by their _id field

   * @param  {Number} id
   * @return {Promise}
   */
  onFindById(id) {
    let anime = animeItems.get(id) || {};
    if (!_.isEmpty()) {
      return this.trigger(anime);
    }

    return Promise.all([getAnimeItem(id), getAnimeEpisodes(id)])
      .then((responseValue) => {
        anime = responseValue.reduce(_.assign, anime);
        animeItems = animeItems.set(id, anime);
        this.trigger(anime);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
