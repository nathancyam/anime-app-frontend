import { connect } from 'react-redux';
import TorrentList from '../views/TorrentList';
import Immutable from 'immutable';
import {
  searchTorrents,
  addTorrent,
  resetTorrents,
  changeCurrentPage
} from '../modules/Torrent/actions';

export const mapStateToProps = ({ torrents }) => {
  let currentPage = torrents.getIn(['pagination', 'currentPage']);
  let itemsPerPage = torrents.getIn(['pagination', 'itemsPerPage']);
  let start = currentPage * itemsPerPage;
  let end = (currentPage + 1) * itemsPerPage;
  let torrentPage = torrents.get('list').slice(start, end);

  return {
    _meta: Immutable.fromJS({ title: 'Torrents' }),
    searchTerm: torrents.get('query'),
    isFetching: torrents.getIn(['_meta', 'isFetching']),
    list: torrentPage,
    numberOfResults: torrents.get('list').count(),
    pagination: torrents.get('pagination')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    /**
     * Action a query change
     *
     * @param {String} query
     */
    onQueryChange(query) {
      dispatch(searchTorrents(query));
    },

    /**
     * Add a torrent
     *
     * @param {Object} torrent
     */
    onAddTorrent(torrent) {
      dispatch(addTorrent(torrent));
    },

    /**
     * Reset torrents
     */
    onResetTorrents() {
      dispatch(resetTorrents());
    },

    /**
     * @param {Number} page
     */
    onChangeCurrentPage(page) {
      dispatch(changeCurrentPage(page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TorrentList);
