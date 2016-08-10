import React, { Component, PropTypes } from 'react';
import ListItem from '../components/Anime/ListItem';
import { factory } from '../services/AnimeCollectionService';
import { hostname } from '../helpers';

const FilterComponent = ({ filterLabels, onFilterCallback }) => {
  const _onFilterCallback = (event) => {
    return onFilterCallback(event.target.value);
  };

  return (
    <div className="col-xs-12 col-sm-3">
      <select className="form-control"
              onChange={_onFilterCallback}>
        <option value="reset">{filterLabels.main}</option>
        <option value={true}>{filterLabels.enabled}</option>
        <option value={false}>{filterLabels.disabled}</option>
      </select>
    </div>
  );
};

export default class AnimeList extends Component {

  static fetchData() {
    return new Promise((resolve, reject) => {
      factory()
        .getAnime()
        .then(anime => resolve({ anime: { isFetching: false, anime } }))
        .catch(error => reject(error));
    });
  }

  constructor(props) {
    super(props);
    this._onFilterByName = this._onFilterByName.bind(this);
    this.handleListScroll = this.handleListScroll.bind(this);
  }

  componentDidMount() {
    document.title = this.props._meta.get('title');
    window.addEventListener('scroll', this.handleListScroll);
    this.props.fetchAnime();
    this.handleListScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleListScroll);
  }

  handleListScroll() {
    this.props.handleImageRegistryUpdate();
  }

  _onFilterByName(event) {
    this.props.onFilterByName(event.target.value);
  }

  render() {
    const {
      onFilterByComplete,
      onFilterByWatching,
      onDeleteAnime,
      anime
    } = this.props;

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="row anime-filters">
            <div className="col-xs-12">
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-xs-12 col-sm-6">
                    <input className="form-control" type="text"
                      placeholder="Filter By Name"
                      value={this.props.filters.getIn(['title', 'value'])}
                      onChange={this._onFilterByName} />
                  </div>
                  <FilterComponent filterLabels={{
                    main: 'Complete Status',
                    enabled: 'Completed',
                    disabled: 'In progress'
                  }} onFilterCallback={onFilterByComplete} />
                  <FilterComponent filterLabels={{
                    main: 'Watching Status',
                    enabled: 'Watching',
                    disabled: 'Not Watching'
                  }} onFilterCallback={onFilterByWatching} />
                </div>
              </form>
            </div>
          </div>
          <div className="row anime-row">
            {
              anime.map((el, index) => {
                return <ListItem
                  key={`anime-${index}-item`}
                  onDeleteAnime={onDeleteAnime}
                  anime={el}
                  mediaRoot={hostname}
                />;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

AnimeList.propTypes = {
  onFilterByName: PropTypes.func.isRequired,
  onFilterByComplete: PropTypes.func.isRequired,
  onFilterByWatching: PropTypes.func.isRequired,
  handleImageRegistryUpdate: PropTypes.func
};
