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
          <button className="btn btn-info btn-sm"
                  onClick={_onAddEpisodeToCollection}>
            Add Episode to Collection
          </button>
        </div>
      </div>
    </li>
  );
};

const TorrentFilters = ({ filterNameValue, onFilterByName }) => {
  return (
    <form className="form-inline">
      <div className="form-group">
        <input type="text" placeholder="Filter by name" value={filterNameValue}
               className="form-control"
               onChange={onFilterByName} />
      </div>
    </form>
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

  _onFilterByName(event) {
    this.props.onFilterTorrents(event.target.value);
  }

  renderListing() {
    const { torrents, filterNameValue } = this.props;

    if (torrents.count() === 0) {
      return (
        <section>
          <div className="row">
            <div className="col-xs-3 col-xs-push-4">
              <i className="fa fa-circle-o-notch fa-spin center-loading" />
              <h4 className="text-center">Loading</h4>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section>
        <div className="row">
          <div className="col-xs-12">
            <TorrentFilters filterNameValue={filterNameValue} onFilterByName={this._onFilterByName.bind(this)} />
          </div>
        </div>
        <ul className="list-group">
          {torrents.map(torrent => {
            return <TorrentItem torrent={torrent} onAddEpisodeToCollection={this._onAddEpisodeToCollection.bind(this)} />
          })}
        </ul>
      </section>
    );
  }

  render() {
    return(
      <section>
        <div className="row">
          <div className="col-xs-12">
            <h1>Torrent Server</h1>
            {this.renderListing()}
          </div>
        </div>
      </section>
    );
  }
}