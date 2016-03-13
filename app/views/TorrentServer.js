/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import React, { Component } from 'react';
import { factory } from '../services/WebsocketService';

const TorrentItem = ({ torrent, onAddEpisodeToCollection }) => {
  const process = Math.floor(torrent.get('percentDone') * 100);

  const _onAddEpisodeToCollection = (event) => {
    event.preventDefault();
    onAddEpisodeToCollection(torrent);
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
        <div className="col-xs-12">
          <button className="btn btn-info btn-sm"
                  onClick={_onAddEpisodeToCollection}>
            Add Episode to Collection
          </button>
        </div>
      </div>
    </li>
  );
};

export default class TorrentServer extends Component {

  componentDidMount() {
    const wsService = factory();
    wsService.addListener('torrent_server:listing', data => {
      this.props.onUpdateTorrentListing(data);
    });
    wsService.connect();
  }

  _onAddEpisodeToCollection(torrent) {
    this.props.onAddEpisodeToCollection(torrent)
  }

  render() {
    const { torrentServer } = this.props;

    return(
      <div className="row">
        <div className="col-xs-12">
          <h1>Torrent Server</h1>
          <ul className="list-group">
            {torrentServer.map(torrent => {
              return <TorrentItem torrent={torrent} onAddEpisodeToCollection={this._onAddEpisodeToCollection.bind(this)} />
            })}
          </ul>
        </div>
      </div>
    );
  }
}