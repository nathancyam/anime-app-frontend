import React from 'react';
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

class TorrentPagination extends React.Component {
  render () {
    return (
      <Pagination bsSize="medium" {...this.props} /> );
  }
}

export default class TorrentList extends React.Component {

  onQueryChange(event) {
    this.props.onQueryChange(event.target.value);
  }

  render() {
    const { torrents, searchTerm, isFetching, onAddTorrent } = this.props;
    const numberOfResults = torrents.count();
    let loadingClass = numberOfResults === 0 ? 'loading' : '';

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
                  onChange={this.onQueryChange.bind(this)} />
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
              activePage={1}
              prev={true}
              next={true} />
            {
              torrents.map((result, index) => {
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
