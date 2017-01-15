/**
 * Created by nathanyam on 2/04/2016.
 */


"use strict";

import Immutable from 'immutable';
import { fetchAnime } from '../AnimeCollection/actions';
import { pushNewNotification } from '../Ui/actions';
import { factory } from '../../services/AnimeItemService';

export const SAVED_ANIME = 'app/AnimeItem/SAVED_ANIME';
function savedAnime(anime) {
  return {
    type: SAVED_ANIME,
    anime: Immutable.fromJS(anime)
  };
}

/**
 * @param {string} animeId
 * @param {string} property
 * @param {*} value
 * @return {function(*)}
 */
export function animePropertyChange(animeId, property, value) {
  return dispatch => {
    const successNotification = { type: 'success', msg: 'Successful updated anime'};
    const errorNotification = { type: 'error', msg: 'Failed to updated anime' };

    const animeService = factory(animeId);
    animeService.saveAnime({ [property]: value })
      .then(anime => {
        dispatch(pushNewNotification(successNotification));
        dispatch(savedAnime(anime));
      })
      .catch(err => {
        dispatch(pushNewNotification(errorNotification));
        console.error(err)
      });
  };
}

/**
 * @param {string} animeId
 * @return {function(*)}
 */
export function deleteAnime(animeId) {
  return dispatch => {
    const animeService = factory(animeId);
    animeService.removeAnime()
      .then(() => dispatch(fetchAnime()))
      .catch(err => console.error(err));
  };
};
