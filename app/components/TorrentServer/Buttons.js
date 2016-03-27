/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';

export const AddToCollectionButton = ({ onAddEpisodeToCollection, hasEpisode }) => {
  if (hasEpisode) {
    return <button className="btn btn-info btn-sm">In Collection</button>;
  }

  return (
    <button className="btn btn-info btn-sm"
            onClick={onAddEpisodeToCollection}>
      <i className="fa fa-plus" /> Auto assign episode
    </button>
  );
};

/**
 * @param onClick
 * @param hasEpisode
 * @returns {XML}
 * @constructor
 */
export const AddToAnimeButton = ({ onClick, hasEpisode }) => {
  if (hasEpisode) {
    return <span />;
  }

  return (
    <button className="btn btn-warning btn-sm"
            onClick={onClick}>
      Pick Anime to Add
    </button>
  );
};

export const ResumeButton = ({ onClick, torrent }) => {

  if (torrent.get('percentDone') >= 1) {
    return <button className="btn btn-default btn-sm">Completed</button>
  }

  const status = torrent.get('status') === 4
    ? { label: 'Pause', icon: 'fa-pause' }
    : { label: 'Resume', icon: 'fa-play' };

  return (
    <button className="btn btn-success btn-sm"
      onClick={onClick}>
      <i className={`fa ${status.icon}`} /> {status.label}
    </button>
  )
};
