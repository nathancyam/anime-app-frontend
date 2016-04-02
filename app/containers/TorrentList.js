import { connect } from 'react-redux';
import TorrentList from '../views/TorrentList';
import Immutable from 'immutable';
import { searchTorrents, addTorrent, resetTorrents } from '../modules/Torrent/actions';

const mapStateToProps = ({ torrents }) => {
  return {
    _meta: Immutable.fromJS({ title: 'Torrents' }),
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
