/**
 * Created by nathanyam on 7/03/2016.
 */

import AnimeNewsNetworkService from '../../services/AnimeNewsNetworkService';

export const IS_FETCHING = 'app/AnimeNewsNetwork/IS_FETCHING';
export function isFetching(value) {
  return {
    type: IS_FETCHING,
    value
  }
}

export const RECEIVED_ANIME_NEWS_NETWORK_RESPONSE = 'app/AnimeNewsNetwork/RECEIVED_ANIME_NEWS_NETWORK_RESPONSE';
function receivedAnimeNewsNetworkResponse(animeId, response) {
  return {
    type: RECEIVED_ANIME_NEWS_NETWORK_RESPONSE,
    animeId,
    response
  }
}

export function fetchAnimeNewsNetworkDetails(query, animeId, isId = false) {
  let animeNewsNetwork = new AnimeNewsNetworkService();

  return async dispatch => {
    dispatch(isFetching(true));
    const jsonResponse = await animeNewsNetwork.search(query, isId);
    return dispatch(receivedAnimeNewsNetworkResponse(animeId, jsonResponse));
  }
}

export function updateImage(animeId, animeName, annId = false) {
  let animeNewsNetwork = new AnimeNewsNetworkService();

  return async () => {
    await animeNewsNetwork.updateImage(animeId, animeName, annId);
  }
}
