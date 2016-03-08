import { factory } from '../services/EpisodeService';

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
    factory(animeId)
      .getEpisodes()
      .then(episodes => {
        return dispatch(receivedEpisodes(animeId, episodes));
      });
  };
}
