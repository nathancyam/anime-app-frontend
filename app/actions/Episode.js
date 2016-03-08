import { hostname, fetchApi } from '../helpers';

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

export async function getAnimeEpisodes(animeId) {
  return await makeRequest(`${hostname}/episodes/anime/${animeId}`);
}

export const RECEIVED_EPISODES = 'RECEIVED_EPISODES';

/**
 * @param {String} animeId
 * @param {Object[]} episodes
 * @returns {{type: string, animeId: *, episodes: *}}
 */
export function receivedEpisodes(animeId, episodes) {
  return {
    type: RECEIVED_EPISODES,
    animeId,
    episodes
  }
}

/**
 * @param {String} animeId
 * @returns {Function}
 */
export function fetchAnimeEpisodes(animeId) {
  return dispatch => {
    getAnimeEpisodes(animeId)
      .then(episodes => {
        return dispatch(receivedEpisodes(animeId, episodes));
      });
  };
}
