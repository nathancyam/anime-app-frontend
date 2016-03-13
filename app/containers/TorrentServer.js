/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import { connect } from 'react-redux';
import TorrentServer from '../views/TorrentServer';
import { updateTorrentServer, addEpisodeToCollection, filterByName } from '../actions/TorrentServer';

const filterCollectionByName = (collection, name) => {
  if (!name || name.length === 0) {
    return collection;
  }
  return collection.filter(torrent => torrent.get('name').toLowerCase().indexOf(name.toLowerCase()) !== -1);
};

const mapStateToProps = ({ torrentServer }) => {
  return {
    torrents: filterCollectionByName(torrentServer.get('list'), torrentServer.getIn(['filter', 'name'])),
    filterNameValue: torrentServer.getIn(['filter', 'name'])
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TorrentServer);
