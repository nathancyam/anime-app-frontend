import Reflux from 'reflux';
import Immutable from 'immutable';
import { hostname, fetchApi } from './Constants';
import { Actions as AnimeActions } from './AnimeStore';

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
    fetchApi(url)
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
    let response = await fetchApi(`${hostname}/anime`,
      {
        method: 'POST',
        body: JSON.stringify(anime)
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

/**
 * @param {Number} id
 * @returns {Promise}
 */
function getAnimeItem(id) {
  return makeRequest(`${hostname}/anime/${id}`);
}

/**
 * @param {Number} id
 * @returns {Promise}
 */
function getAnimeEpisodes(id) {
  return makeRequest(`${hostname}/episodes/anime/${id}`).
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
   * @param {Object} animeDiff
   */
  async onSaveAnime(animeDiff) {
    await saveAnime(animeDiff);
    Actions.reset(animeDiff._id);
    AnimeActions.resetAnimeById(animeDiff._id);
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
