/**
 * Created by nathanyam on 2/04/2016.
 */


"use strict";

import Immutable from 'immutable';
import { fetchAnime } from '../AnimeCollection/actions';
import { factory } from '../../services/AnimeItemService';

export const SAVED_ANIME = 'app/AnimeItem/SAVED_ANIME';
export const savedAnime = (anime) => {
  return {
    type: SAVED_ANIME,
    anime: Immutable.fromJS(anime)
  };
};

export const animePropertyChange = (animeId, property, value) => {
  return dispatch => {
    const animeService = factory(animeId);
    animeService.saveAnime({ [property]: value })
      .then(anime => dispatch(savedAnime(anime)))
      .catch(err => console.error(err));
  };
};

export const deleteAnime = (animeId) => {
  return dispatch => {
    const animeService = factory(animeId);
    animeService.removeAnime()
      .then(() => dispatch(fetchAnime()))
      .catch(err => console.error(err));
  };
};
