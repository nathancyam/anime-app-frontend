/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import React, { Component, PropTypes } from 'react';
import { factory } from '../services/WebsocketService';
import { factory as animeService } from '../services/AnimeCollectionService';
import { Pagination } from 'react-bootstrap';
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

  constructor(props) {
    super(props);
    this._onAddEpisodeToCollection = this._onAddEpisodeToCollection.bind(this);
    this._onFilterByName = this._onFilterByName.bind(this);
    this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);
  }

  componentDidMount() {
    const { onUpdateTorrentListing, onFetchAllEpisodes, onForceUpdateListing } = this.props;
    const wsService = factory();
    document.title = 'Torrent Server | Anime App';
    wsService.addListener('torrent_server:listing', data => {
      onUpdateTorrentListing(data);
    });
    wsService.connect();
    onFetchAllEpisodes();
    onForceUpdateListing();
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

  onChangeCurrentPage(event, page) {
    event.preventDefault();
    this.props.onChangeCurrentPage(page.eventKey - 1);
  }

  renderListing() {
    const {
      torrents,
      filterNameValue,
      totalNumberOfTorrents,
      sort,
      sortFields,
      currentPage,
      onChangeOrder,
      onChangeField,
      onResumeTorrent,
      onPauseTorrent,
      onShowTorrentModal
    } = this.props;

    if (totalNumberOfTorrents === 0 && filterNameValue.length === 0) {
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
                onFilterByName={this._onFilterByName}
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
        <Pagination
          bsSize="medium"
          items={Math.floor(totalNumberOfTorrents / 10) + 1}
          activePage={currentPage + 1}
          onSelect={this.onChangeCurrentPage}
        />
        <ul className="list-group">
          {torrents.map((torrent, key) => {
            return (
              <TorrentItem
                key={`torrent_${key}`}
                hasEpisode={this.hasEpisode(torrent)}
                torrent={torrent}
                onPauseTorrent={onPauseTorrent}
                onResumeTorrent={onResumeTorrent}
                showTorrentModal={onShowTorrentModal}
                onAddEpisodeToCollection={this._onAddEpisodeToCollection}
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
      onHideTorrentModal,
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
              onHideModal={onHideTorrentModal}
            />
            {this.renderListing()}
          </div>
        </div>
      </section>
    );
  }
}

TorrentServer.propTypes = {
  // Properties
  anime: PropTypes.object,
  modal: PropTypes.object,
  torrents: PropTypes.object.isRequired,
  filterNameValue: PropTypes.string,
  sort: PropTypes.object,
  sortFields: PropTypes.array,

  // Callbacks
  onAssignToAnime: PropTypes.func,
  onChangeOrder: PropTypes.func,
  onChangeField: PropTypes.func,
  onFetchAllEpisodes: PropTypes.func.isRequired,
  onHideTorrentModal: PropTypes.func,
  onShowTorrentModal: PropTypes.func,
  onPauseTorrent: PropTypes.func,
  onResumeTorrent: PropTypes.func,
  onUpdateTorrentListing: PropTypes.func.isRequired
};
