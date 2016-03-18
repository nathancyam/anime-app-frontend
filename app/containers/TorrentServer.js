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
  sortTorrents
} from '../actions/TorrentServer';
import {
  fetchAllEpisodes
} from '../actions/Episode';

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

const mapStateToProps = ({ torrentServer, episodes }) => {
  let torrents = torrentServer.get('list')
    .filter(namePredicate(torrentServer.getIn(['filter', 'name'])))
    .sort(sortPredicate(torrentServer.getIn(['sort', 'field'])));

  if (torrentServer.getIn(['sort', 'order']) === 'desc') {
    torrents = torrents.reverse();
  }

  const episodeFileNames = episodes
    .valueSeq()
    .flatten(true)
    .map(el => el.get('fileName'));

  return {
    sortFields: ['percentDone', 'name', 'peersConnected'],
    episodes: episodeFileNames,
    torrents,
    filterNameValue: torrentServer.getIn(['filter', 'name']),
    sort: torrentServer.get('sort')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTorrentListing(data) {
      dispatch(updateTorrentServer(data));
    },
    onAddEpisodeToCollection(torrent) {
      dispatch(addEpisodeToCollection(torrent));
    },
    onFilterTorrents(value) {
      dispatch(filterByName(value));
    },
    onChangeField(event) {
      dispatch(sortTorrents(event.target.value));
    },
    onChangeOrder(event) {
      dispatch(sortTorrents(null, event.target.value));
    },
    fetchAllEpisodes() {
      dispatch(fetchAllEpisodes());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TorrentServer);
