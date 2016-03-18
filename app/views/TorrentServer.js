/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import React, { Component } from 'react';
import _ from 'lodash';
import { factory } from '../services/WebsocketService';

const AddToCollectionButton = ({ onAddEpisodeToCollection, hasEpisode }) => {
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

const TorrentItem = ({ hasEpisode, torrent, onAddEpisodeToCollection }) => {
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
          <AddToCollectionButton
            hasEpisode={hasEpisode}
            onAddEpisodeToCollection={_onAddEpisodeToCollection}
          />
        </div>
      </div>
    </li>
  );
};

const TorrentFilters = ({ filterNameValue, onFilterByName }) => {
  return (
    <input type="text" placeholder="Filter by name" value={filterNameValue}
           className="form-control"
           onChange={onFilterByName} />
  );
};

const TorrentSort = ({ fields, onChangeField, onChangeOrder, currentField, currentOrder }) => {
  const toNormalCase = (string) => {
    return _.snakeCase(string)
      .split('_')
      .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
      .join(' ');
  };

  return (
    <div className="sort-torrents">
      <div className="col-xs-12 col-sm-2">
        <select className="form-control" onChange={onChangeField} value={currentField}>
          {
            fields.map(field => {
              return <option key={`field_${field}`} value={field}>{toNormalCase(field)}</option>;
            })
          }
        </select>
      </div>
      <div className="col-xs-12 col-sm-2">
        <select className="form-control" onChange={onChangeOrder} value={currentOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default class TorrentServer extends Component {

  componentDidMount() {
    const { onUpdateTorrentListing, fetchAllEpisodes } = this.props;
    const wsService = factory();
    wsService.addListener('torrent_server:listing', data => {
      onUpdateTorrentListing(data);
    });
    wsService.connect();
    fetchAllEpisodes();
  }

  _onAddEpisodeToCollection(torrent) {
    this.props.onAddEpisodeToCollection(torrent)
  }

  _onFilterByName(event) {
    this.props.onFilterTorrents(event.target.value);
  }

  hasEpisode(torrent) {
    return this.props.episodes.find(el => el === torrent.get('name'));
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
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-xs-12 col-sm-8">
              <TorrentFilters filterNameValue={filterNameValue} onFilterByName={this._onFilterByName.bind(this)} />
            </div>
            <TorrentSort fields={this.props.sortFields}
                         currentField={this.props.sort.get('field')}
                         currentOrder={this.props.sort.get('order')}
                         onChangeOrder={this.props.onChangeOrder}
                         onChangeField={this.props.onChangeField}
             />
          </div>
        </form>
        <ul className="list-group">
          {torrents.map((torrent, key) => {
            return (
              <TorrentItem
                key={`torrent_${key}`}
                hasEpisode={this.hasEpisode(torrent)}
                torrent={torrent}
                onAddEpisodeToCollection={this._onAddEpisodeToCollection.bind(this)}
              />
            );
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