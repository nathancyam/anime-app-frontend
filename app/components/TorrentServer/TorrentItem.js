/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';
import AddToCollectionButton from './AddToCollectionButton';

export default ({ hasEpisode, torrent, onAddEpisodeToCollection, showTorrentModal }) => {
  const process = Math.floor(torrent.get('percentDone') * 100);

  const _onAddEpisodeToCollection = (event) => {
    event.preventDefault();
    onAddEpisodeToCollection(torrent);
  };
  
  const _showTorrentModal = (event) => {
    event.preventDefault();
    showTorrentModal(torrent);
  };

  return (
    <li className="list-group-item">
      <h4>{torrent.get('name')}</h4>
      <div className="row">
        <div className="col-xs-12">
          <div className="progress">
            <div className="progress-bar"
                 role="progressbar"
                 aria-valuenow={process}
                 aria-valuemin="0"
                 aria-valuemax="100" style={{width: `${process}%`}}>
              {`${process}%`}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6">
          <p>Estimated Time: {torrent.get('eta') == -1 ? 'Completed' : torrent.get('eta') }</p>
          <p>Torrent File: {torrent.get('torrentFile')}</p>
        </div>
        <div className="col-xs-6">
          <p>Peers Connected: {torrent.get('peersConnected')}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <AddToCollectionButton
            hasEpisode={hasEpisode}
            onAddEpisodeToCollection={_onAddEpisodeToCollection}
          />
          <button className="btn btn-default btn-sm"
                  onClick={_showTorrentModal}>
            Add to Anime
          </button>
        </div>
      </div>
    </li>
  );
};

