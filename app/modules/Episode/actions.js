import { factory } from '../../services/EpisodeService';

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

export const RECEIVED_ALL_EPISODES = 'app/Episode/RECEIVED_ALL_EPISODES';
export function receivedAllEpisodes(episodes) {
  return {
    type: RECEIVED_ALL_EPISODES,
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

export function fetchAllEpisodes() {
  return dispatch => {
    factory()
      .getEpisodes()
      .then(episodes => {
        const sortedEpisodes = episodes.reduce((carry, item) => {
          const hasAnime = item.has('anime');
          if (!hasAnime) {
            return carry;
          }

          const anime = item.get('anime');
          if (!carry[anime]) {
            carry[anime] = [ item ];
            return carry;
          }

          carry[anime].push(item);
          return carry;
        }, {});

        return dispatch(receivedAllEpisodes(sortedEpisodes));
      });
  }
}
