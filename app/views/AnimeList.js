import React, { Component, PropTypes } from 'react';
import ListItem from '../components/Anime/ListItem';
import AnimeStore, { Actions, getAnime } from '../stores/AnimeStore';
import Immutable from 'immutable';
import { hostname } from '../stores/Constants';

const FilterComponent = ({ filterLabels, onFilterCallback }) => {
  const _onFilterCallback = (event) => {
    return onFilterCallback(event.target.value);
  };

  return (
    <div className="col-xs-12 col-md-6">
      <select className="form-control"
              onChange={_onFilterCallback}>
        <option value="">{filterLabels.main}</option>
        <option value={true}>{filterLabels.enabled}</option>
        <option value={false}>{filterLabels.disabled}</option>
      </select>
    </div>
  );
};

export default class AnimeList extends Component {

  static fetchData() {
    return new Promise((resolve, reject) => {
      getAnime()
        .then((jsonResponse) => {
          return resolve({
            anime: Immutable.fromJS(jsonResponse)
          });
        })
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }

  render() {
    const {
      onFilterByName,
      onFilterByComplete,
      onFilterByWatching,
      anime
    } = this.props;

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
                      onChange={onFilterByName} />
                  </div>
                  <div className="col-xs-2">
                  </div>
                </div>
                <div className="form-group">
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

AnimeList.propTypes = {
  onFilterByName: PropTypes.func.isRequired,
  onFilterByComplete: PropTypes.func.isRequired,
  onFilterByWatching: PropTypes.func.isRequired
};
