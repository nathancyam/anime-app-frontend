/**
 * Created by nathanyam on 7/03/2016.
 */

import { hostname, fetchApi } from '../helpers';

const ANN_SEARCH_URI = `/ann/search`;
const ANN_IMAGE_POST_URI = `${hostname}/anime/image`;

export async function makeAnnRequest(query, isId = false) {
  let searchUrl = `${ANN_SEARCH_URI}?${isId ? 'ann_id' : 'name'}=${query}`;
  let response = await fetchApi(searchUrl);
  return await response.json();
}

export const IS_FETCHING = 'IS_FETCHING';
export function isFetching(value) {
  return {
    type: IS_FETCHING,
    value
  }
}

export const RECEIVED_ANIME_NEWS_NETWORK_RESPONSE = 'RECEIVED_ANIME_NEWS_NETWORK_RESPONSE';
function receivedAnimeNewsNetworkResponse(animeId, response) {
  return {
    type: RECEIVED_ANIME_NEWS_NETWORK_RESPONSE,
    animeId,
    response
  }
}

export function fetchAnimeNewsNetworkDetails(query, animeId, isId = false) {
  return async dispatch => {
    dispatch(isFetching(true));
    const jsonResponse = await makeAnnRequest(query, isId);
    return dispatch(receivedAnimeNewsNetworkResponse(animeId, jsonResponse));
  }
}
