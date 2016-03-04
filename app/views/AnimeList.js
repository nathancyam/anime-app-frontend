import React from 'react';
import AnimeItem from './AnimeItem';
import AnimeStore, { Actions, getAnime } from '../stores/AnimeStore';
import { hostname } from '../stores/Constants';
import fetch from 'isomorphic-fetch';

class CompleteAnimeFilter extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <select className="form-control"
                onChange={this.props.onFilterByComplete}>
          <option value="">Select Complete</option>
          <option value={true}>Complete</option>
          <option value={false}>Incomplete</option>
        </select>
      </div>
    );
  }
}

class WatchingAnimeFilter extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <select className="form-control"
                onChange={this.props.onFilterByWatching}>
          <option value="">Select Watching</option>
          <option value={true}>Watching</option>
          <option value={false}>Not Watching</option>
        </select>
      </div>
    );
  }
}

export default class AnimeList extends React.Component {

  constructor(props) {
    super(props);
    this.onAnimeListChange = this.onAnimeListChange.bind(this);
    this.onFilterByComplete = this.onFilterByComplete.bind(this);
    this.onFilterByWatching = this.onFilterByWatching.bind(this);
    this.state = {list: []};
  }

  static fetchData() {
    return new Promise((resolve, reject) => {
      getAnime()
        .then((jsonResponse) => {
          return resolve({
            animeStore: jsonResponse
          });
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        });
    });
  }

  componentDidMount() {
    this.unsubscribe = AnimeStore.listen(this.onAnimeListChange.bind(this));
    Actions.getAll();
  }

  componentWillUnmount() {
    Actions.reset();
    this.unsubscribe();
  }

  onAnimeListChange(list) {
    this.setState({ list });
  }

  onFilterByName(event) {
    if (event.target.value === '') {
      Actions.reset();
    } else {
      Actions.filterByName(event.target.value);
    }
  }

  onFilterByComplete(event) {
    Actions.filterByComplete(event.target.value);
  }

  onRefresh(event) {
    event.preventDefault();
    Actions.forceUpdate();
  }

  onFilterByWatching(event) {
    Actions.filterByWatching(event.target.value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row anime-filters">
            <div className="col-xs-12">
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-xs-10">
                    <input className="form-control" type="text"
                      placeholder="Filter By Name"
                      onChange={this.onFilterByName} />
                  </div>
                  <div className="col-xs-2">
                    <button className="btn btn-primary btn-block"
                      onClick={this.onRefresh}>
                      <i className="fa fa-refresh"></i>
                      <span className="hidden-xs"
                        style={{paddingLeft: "5px"}}>Sync</span>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <CompleteAnimeFilter onFilterByComplete={this.onFilterByComplete} />
                  <WatchingAnimeFilter onFilterByWatching={this.onFilterByWatching} />
                </div>
              </form>
            </div>
          </div>
          <div className="row anime-row">
            {
              this.state.list.map((el, index) => {
                return <AnimeItem
                  key={`anime-${index}-item`}
                  anime={el}
                  mediaRoot={hostname} />;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
