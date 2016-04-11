/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import { connect } from 'react-redux';
import TorrentServer from '../views/TorrentServer';
import {
  updateTorrentServer,
  addEpisodeToCollection,
  filterByName,
  sortTorrents,
  assignToAnime,
  resumeTorrent,
  pauseTorrent,
  forceUpdateListing,
  changeCurrentPage
} from '../modules/TorrentServer/actions';
import {
  showTorrentModal,
  hideTorrentModal
} from '../modules/Ui/actions';
import {
  fetchAllEpisodes
} from '../modules/Episode/actions';

const namePredicate = name => {
  return torrent => {
    if (!name || name.length === 0) {
      return true;
    }
    return torrent.get('name').toLowerCase().indexOf(name.toLowerCase()) !== -1;
  }
};

const sortPredicate = field => {
  return (elA, elB) => {
    const aField = elA.get(field);
    const bField = elB.get(field);

    if (aField > bField) {
      return 1;
    } else if (aField < bField) {
      return -1;
    } else {
      return 0;
    }
  };
};

const mapStateToProps = ({ anime, torrentServer, episodes, uiMeta }) => {
  let torrents = torrentServer.get('list')
    .filter(namePredicate(torrentServer.getIn(['filter', 'name'])))
    .sort(sortPredicate(torrentServer.getIn(['sort', 'field'])));

  let totalNumberOfTorrents = torrents.count();
  let currentPage = torrentServer.getIn(['pagination', 'currentPage']);
  let itemsPerPage = torrentServer.getIn(['pagination', 'itemsPerPage']);
  let start = currentPage * itemsPerPage;
  let end = (currentPage + 1) * itemsPerPage;

  if (torrentServer.getIn(['sort', 'order']) === 'desc') {
    torrents = torrents.reverse();
  }

  torrents = torrents.slice(start, end);

  const episodeFileNames = episodes
    .valueSeq()
    .flatten(true)
    .map(el => el.get('fileName'));

  return {
    anime: anime.get('anime'),
    modal: uiMeta.getIn(['modal', 'torrent']),
    sortFields: ['percentDone', 'name', 'peersConnected'],
    episodes: episodeFileNames,
    filterNameValue: torrentServer.getIn(['filter', 'name']),
    sort: torrentServer.get('sort'),
    torrents,
    currentPage,
    totalNumberOfTorrents: totalNumberOfTorrents
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Assigns a torrent to an anime.
     * @param torrent
     * @param animeId
     */
    onAssignToAnime(torrent, animeId) {
      dispatch(assignToAnime(torrent, animeId));
    },

    /**
     * Hides the modal on the torrent server page.
     */
    onHideTorrentModal() {
      dispatch(hideTorrentModal());
    },

    /**
     * Shows the modal on the torrent server page.
     * @param {Map} torrentObj
     */
    onShowTorrentModal(torrentObj) {
      dispatch(showTorrentModal(torrentObj));
    },

    /**
     * Updates the torrent server.
     * @param data
     */
    onUpdateTorrentListing(data) {
      dispatch(updateTorrentServer(data));
    },

    /**
     * Adds an episode to the anime collection
     * @param torrent
     */
    onAddEpisodeToCollection(torrent) {
      dispatch(addEpisodeToCollection(torrent));
    },

    /**
     * Filters torrent list by given value
     * @param value
     */
    onFilterTorrents(value) {
      dispatch(filterByName(value));
    },

    /**
     * Sorts the torrents given a field.
     * @param event
     */
    onChangeField(event) {
      dispatch(sortTorrents(event.target.value));
    },

    /**
     * Changes the sorting order of the current field.
     * @param event
     */
    onChangeOrder(event) {
      dispatch(sortTorrents(null, event.target.value));
    },

    /**
     * Resumes a paused torrent
     * @param torrent
     */
    onResumeTorrent(torrent) {
      dispatch(resumeTorrent(torrent));
    },

    /**
     * Pauses a torrent
     * @param torrent
     */
    onPauseTorrent(torrent) {
      dispatch(pauseTorrent(torrent));
    },

    /**
     * Force a torrent listing update.
     */
    onForceUpdateListing() {
      dispatch(forceUpdateListing())
    },

    /**
     * Fetches all episode models
     */
    onFetchAllEpisodes() {
      dispatch(fetchAllEpisodes());
    },

    /**
     * @param page
     */
    onChangeCurrentPage(page) {
      dispatch(changeCurrentPage(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TorrentServer);
