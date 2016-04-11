import React, { Component, PropTypes } from 'react';
import TorrentItem from '../components/Torrents/TorrentItem';
import { Pagination } from 'react-bootstrap';

const ResultCounter = ({ numberOfResults, isFetching }) => {
  const styles = {
    position: 'absolute',
    top: '0.75rem',
    right: '3rem',
    color: 'grey'
  };

  if (isFetching) {
    return <span style={styles}><i className="fa fa-spin fa-circle-o-notch" /></span>;
  } else {
    return <span style={styles}>{`${numberOfResults} results found`}</span>;
  }
};

class TorrentPagination extends Component {
  render () {
    return <Pagination bsSize="medium" {...this.props} />;
  }
}

export default class TorrentList extends React.Component {

  constructor(props) {
    super(props);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);
  }

  onQueryChange(event) {
    this.props.onQueryChange(event.target.value);
  }

  onChangeCurrentPage(event, page) {
    event.preventDefault();
    this.props.onChangeCurrentPage(page.eventKey - 1);
  }

  componentDidMount() {
    document.title = 'Torrent List | Anime App';
  }

  componentWillUnmount() {
    this.props.onResetTorrents();
  }

  render() {
    const {
      list,
      searchTerm,
      isFetching,
      onAddTorrent,
      numberOfResults,
      pagination
    } = this.props;

    const activePage = pagination.get('currentPage') + 1;

    return (
      <div className="torrent-listing">
        <div className="row">
          <div className="col-xs-12">
            <form>
              <div className="form-group">
                <input className="form-control"
                  type="text"
                  value={searchTerm}
                  placeholder="Search Nyaatorrents"
                  onChange={this.onQueryChange} />
                <ResultCounter
                  isFetching={isFetching}
                  numberOfResults={numberOfResults} />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className={`col-xs-12`}>
            <TorrentPagination
              items={Math.floor(numberOfResults / 10) + 1}
              activePage={activePage}
              onSelect={this.onChangeCurrentPage} />
            {
              list.map((result, index) => {
                return <TorrentItem
                  onAddTorrent={onAddTorrent}
                  key={`torrent-${index}`}
                  torrent={result} />;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

TorrentList.PropTypes = {
  list: PropTypes.object.isRequired,
  numberOfResults: PropTypes.number,
  searchTerm: PropTypes.string,
  pagination: PropTypes.object,
  onAddTorrent: PropTypes.func,
  onRemoveTorrents: PropTypes.func,
  onChangeCurrentPage: PropTypes.func,
  torrents: PropTypes.object
};
