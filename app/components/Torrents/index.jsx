import React from 'react';
import TorrentStore, { Actions } from '../../stores/TorrentStore';
import TorrentItem from './TorrentItem';
import { Pagination } from 'react-bootstrap';

class TorrentPagination extends React.Component {
  render () {
    return (
      <Pagination bsSize="medium" {...this.props} /> );
  }
}

export default class TorrentList extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.state = {
      results: [],
      numberOfResults: 0,
      activePage: 1,
      searchTerm: this.props.initialSearchTerm || ''
    };
  }

  componentDidMount() {
    this.unsubscribe = TorrentStore.listen(this.onSearchResultChange.bind(this));
    if (this.state.searchTerm.length > 0) {
      this.startSearch(this.state.searchTerm);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSearchResultChange(results) {
    this.setState(results);
  }

  onSearchFieldChange(event) {
    if (event.target.value !== '') {
      this.setState({ searchTerm: event.target.value }, this.startSearch);
    }
  }

  onPaginationChange(event, key) {
    Actions.changeTorrentPagination(key.eventKey);
  }

  startSearch() {
    Actions.enterSearchTerm(this.state.searchTerm);
  }

  render() {
    const results = this.state.results;
    let loadingClass = this.state.results.size === 0 ? 'loading' : '';

    return (
      <div className="torrent-listing">
        <div className="row">
          <div className="col-xs-12">
            <form>
              <div className="form-group">
                <input className="form-control"
                  type="text"
                  value={this.state.searchTerm}
                  placeholder="Search Nyaatorrents"
                  onChange={this.onSearchFieldChange} />
                <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '3rem',
                    color: 'grey'
                  }}>{`${this.state.numberOfResults} results found`}</span>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className={`col-xs-12 ${loadingClass}`}>
            <div id="loading-template">
              <p>No results :(</p>
            </div>
            <TorrentPagination
              items={Math.floor(this.state.numberOfResults / 10) + 1}
              activePage={this.state.activePage}
              onSelect={this.onPaginationChange} />
            {
              results.map((result, index) => {
                return <TorrentItem key={`torrent-${index}`}
                  torrent={result} />;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
