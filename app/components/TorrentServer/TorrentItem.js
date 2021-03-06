/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';
import { AddToCollectionButton, AddToAnimeButton, ResumeButton } from './Buttons';

const statusString = (statusCode) => {
  switch (statusCode) {
    case 0:
      return 'Stopped';

    case 1:
      return 'Queued to check';

    case 2:
      return 'Checking files';

    case 3:
      return 'Queued for download';

    case 4:
      return 'Downloading';

    case 5:
      return 'Queued for seed';

    case 6:
      return 'Seeding';

    case 7:
      return 'Unable to find peers';

    default:
      return 'Can not find error code';
  }
};

export default ({ hasEpisode, torrent, onAddEpisodeToCollection, showTorrentModal, onPauseTorrent, onResumeTorrent }) => {
  const process = Math.floor(torrent.get('percentDone') * 100);

  const _onAddEpisodeToCollection = (event) => {
    event.preventDefault();
    onAddEpisodeToCollection(torrent);
  };

  const _toggleTorrent = (event) => {
    event.preventDefault();
    if (torrent.get('status') === 4) {
      onPauseTorrent(torrent);
    } else {
      onResumeTorrent(torrent);
    }
  };
  
  const _showTorrentModal = (event) => {
    event.preventDefault();
    showTorrentModal(torrent);
  };

  const torrentEta = torrent.get('eta') == -1
    ? 'Completed'
    : torrent.get('humanEta');

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
        <div className="col-xs-12 col-sm-6">
          <p className="est">Estimated Time: {torrentEta}</p>
          <p className="torrent">Torrent File: {torrent.get('torrentFile')}</p>
        </div>
        <div className="col-xs-6 col-sm-6">
          <p className="status">Status: {statusString(torrent.get('status'))}</p>
          <p className="peers">Peers Connected: {torrent.get('peersConnected')}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="btn-group">
            <ResumeButton
              onClick={_toggleTorrent}
              torrent={torrent}
            />
            <AddToCollectionButton
              hasEpisode={hasEpisode}
              onAddEpisodeToCollection={_onAddEpisodeToCollection}
            />
            <AddToAnimeButton
              hasEpisode={hasEpisode}
              onClick={_showTorrentModal}
            />
          </div>
          </div>
      </div>
    </li>
  );
};

