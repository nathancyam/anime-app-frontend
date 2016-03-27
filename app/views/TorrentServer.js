/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import React, { Component } from 'react';
import { factory } from '../services/WebsocketService';
import { factory as animeService } from '../services/AnimeCollectionService';
import {
  TorrentFilters,
  TorrentSort,
  TorrentModal,
  TorrentItem
} from '../components/TorrentServer';


export default class TorrentServer extends Component {

  static fetchData() {
    return new Promise((resolve, reject) => {
      animeService()
        .getAnime()
        .then(anime => resolve({ anime: { isFetching: false, anime } }))
        .catch(error => reject(error));
    });
  }

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
    const {
      torrents,
      filterNameValue,
      showTorrentModal,
      sort,
      sortFields,
      onChangeOrder,
      onChangeField,
      onResumeTorrent,
      onPauseTorrent
    } = this.props;

    if (torrents.count() === 0 && filterNameValue.length === 0) {
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
              <TorrentFilters
                filterNameValue={filterNameValue}
                onFilterByName={this._onFilterByName.bind(this)}
              />
            </div>
            <TorrentSort
              fields={sortFields}
              currentField={sort.get('field')}
              currentOrder={sort.get('order')}
              onChangeOrder={onChangeOrder}
              onChangeField={onChangeField}
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
                onPauseTorrent={onPauseTorrent}
                onResumeTorrent={onResumeTorrent}
                showTorrentModal={showTorrentModal}
                onAddEpisodeToCollection={this._onAddEpisodeToCollection.bind(this)}
              />
            );
          })}
        </ul>
      </section>
    );
  }

  render() {
    const {
      anime,
      hideTorrentModal,
      onAssignToAnime,
      modal
    } = this.props;

    return(
      <section>
        <div className="row">
          <div className="col-xs-12">
            <h1>Torrent Server</h1>
            <TorrentModal
              anime={anime}
              modal={modal}
              onAssignToAnime={onAssignToAnime}
              onHideModal={hideTorrentModal}
            />
            {this.renderListing()}
          </div>
        </div>
      </section>
    );
  }
}