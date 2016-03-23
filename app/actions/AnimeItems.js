/**
 * Created by nathanyam on 6/03/2016.
 */

import Immutable from 'immutable';
import { factory } from '../services/AnimeItemService';

export const SAVED_ANIME = 'SAVED_ANIME';
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

