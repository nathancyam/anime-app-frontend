import React from 'react';
import TorrentStore, { Actions } from '../../stores/TorrentStore';
import TorrentItem from './TorrentItem';

export default class TorrentList extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.state = { results: [] };
  }

  componentDidMount() {
    this.unsubscribe = TorrentStore.listen(this.onSearchResultChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onSearchResultChange(results) {
    this.setState({ results });
  }

  onSearchFieldChange(event) {
    if (event.target.value !== '') {
      Actions.enterSearchTerm(event.target.value);
    }
  }

  render() {
    let loadingClass = this.state.results.size === 0 ? 'loading' : '';

    return <div className="torrent-listing">
      <div className="row">
        <div className="col-xs-12">
          <form>
            <div className="form-group">
              <input className="form-control"
                type="text"
                placeholder="Search Nyaatorrents"
                onChange={this.onSearchFieldChange} />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className={`col-xs-12 ${loadingClass}`}>
          <div id="loading-template">
            <p>No results :(</p>
          </div>
          {
            this.state.results.map((result, index) => {
              return <TorrentItem key={`torrent-${index}`}
                torrent={result} />
            })
          }
        </div>
      </div>
    </div>
  }
}
