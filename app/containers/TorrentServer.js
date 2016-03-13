/**
 * Created by nathanyam on 13/03/2016.
 */

"use strict";

import { connect } from 'react-redux';
import TorrentServer from '../views/TorrentServer';
import { updateTorrentServer, addEpisodeToCollection } from '../actions/TorrentServer';

const mapStateToProps = ({ torrentServer }) => {
  return {
    torrentServer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTorrentListing(data) {
      dispatch(updateTorrentServer(data));
    },
    onAddEpisodeToCollection(torrent) {
      dispatch(addEpisodeToCollection(torrent));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TorrentServer);
