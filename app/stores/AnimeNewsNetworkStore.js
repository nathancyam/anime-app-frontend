import Reflux from 'reflux';
import Immutable from 'immutable';
import _ from 'lodash';
import { hostname } from './Constants';
import { Actions as AnimeItemActions } from './AnimeItemStore';
import { Actions as AnimeActions } from './AnimeStore';

const ANN_SEARCH_URI = `${hostname}/ann/search`;
const ANN_IMAGE_POST_URI = `${hostname}/anime/image`;
let annStore = new Immutable.Map({});

/**
 * @param {Object} anime
 */
async function searchAnn(anime) {
  let searchUri = ANN_SEARCH_URI;
  if (anime.ann_id) {
    searchUri = `${searchUri}?ann_id=${anime.ann_id}`;
  } else {
    searchUri = `${searchUri}?name=${anime.title}`;
  }

  try {
    let response = await fetch(searchUri);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

/**
 * @param {Object} anime
 * @param {Object} annResponse
 * @returns {Object}
 */
async function setAnimeImage(anime, annResponse) {
  const imageUpdateURI = `${ANN_IMAGE_POST_URI}/${anime._id}`;
  try {
    let response = fetch(imageUpdateURI,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          animeId: anime._id,
          imageUrl: annResponse.images[0]
        })
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export var Actions = Reflux.createActions([
  'searchAnimeDetails',
  'setAnimeImage'
]);

export default Reflux.createStore({
  listenables: [Actions],

  /**
   * @param {String} anime
   */
  async onSearchAnimeDetails(anime) {
    let result = annStore.get(anime._id) || {};
    if (!(_.isEmpty(result))) {
      return this.trigger(result);
    } else {
      result = await searchAnn(anime);
      annStore = annStore.set(anime._id, result);
      Actions.setAnimeImage(anime, result);
    }

    return this.trigger(result);
  },

  /**
   * @param {Object} anime
   * @param {Object} annResponse
   */
  async onSetAnimeImage(anime, annResponse) {
    await setAnimeImage(anime, annResponse);
    AnimeActions.resetAnimeById(anime._id);
    AnimeItemActions.reset(anime._id);
  }
});
