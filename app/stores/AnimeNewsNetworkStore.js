import Reflux from 'reflux';
import Immutable from 'immutable';
import _ from 'lodash';
import { hostname } from './Constants';

const ANN_SEARCH_URI = `${hostname}/ann/search`;
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
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
}

export var Actions = Reflux.createActions([
  'searchAnimeDetails'
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
    }

    return this.trigger(result);
  }
});
