/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';

export const AddToCollectionButton = ({ onAddEpisodeToCollection, hasEpisode }) => {
  if (hasEpisode) {
    return <button className="btn btn-default btn-sm">In Collection</button>;
  }

  return (
    <button className="btn btn-info btn-sm"
            onClick={onAddEpisodeToCollection}>
      <i className="fa fa-plus" /> Add Episode to Collection
    </button>
  );
};

export const AddToAnimeButton = ({ onClick, hasEpisode }) => {
  if (hasEpisode) {
    return <span />;
  }

  return (
    <button className="btn btn-default btn-sm"
            onClick={onClick}>
      Add to Anime
    </button>
  );
};
