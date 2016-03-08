import { connect } from 'react-redux';
import TorrentList from '../views/TorrentList';
import { searchTorrents, addTorrent, resetTorrents } from '../actions/Torrent';


const mapStateToProps = ({ torrents }) => {
  return {
    searchTerm: torrents.get('query'),
    isFetching: torrents.getIn(['_meta', 'isFetching']),
    torrents: torrents.get('torrents')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQueryChange(query) {
      dispatch(searchTorrents(query));
    },
    onAddTorrent(torrent) {
      dispatch(addTorrent(torrent));
    },
    onResetTorrents() {
      dispatch(resetTorrents());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TorrentList);
