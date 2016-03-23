import React, { Component, PropTypes } from 'react';

const predicateFn = (objTrue, objFalse, boolVal) => {
  if (boolVal) {
    return objTrue;
  } else {
    return objFalse;
  }
};

const FontAwesomeButton = ({ predicate, boolValue, onClick }) => {
  const {
    icon,
    label
  } = predicate(boolValue);

  return (
    <button className="btn btn-success" onClick={onClick}>
      <i className={`fa ${icon}`} /> {label}
    </button>
  );
};

export default class Manage extends Component {

  onWatchingClick(event) {
    event.preventDefault();
    let { anime, onAnimePropertyChange } = this.props;
    return onAnimePropertyChange(anime.get('_id'), 'is_watching', !anime.get('is_watching'));
  }

  onCompleteClick(event) {
    event.preventDefault();
    let { anime, onAnimePropertyChange } = this.props;
    return onAnimePropertyChange(anime.get('_id'), 'is_watching', !anime.get('is_watching'));
  }

  onSubgroupClick(event) {
    event.preventDefault();
    let { anime, onAnimePropertyChange } = this.props;
    return onAnimePropertyChange(anime.get('_id'), 'designated_subgroup', this.subgroup.value);
  }

  render() {
    const { anime } = this.props;
    const isWatching = anime.get('is_watching');
    const subgroup = anime.get('designated_subgroup');
    const isComplete = anime.get('is_complete');

    const isWatchingFn = predicateFn.bind(null, {
        icon: 'fa-eye',
        label: 'Watching'
      }, {
        icon: 'fa-eye-slash',
        label: 'Not Watching'
      }
    );

    const isCompleteFn = predicateFn.bind(null, {
        icon: 'fa-check',
        label: 'Complete'
      }, {
        icon: 'fa-times',
        label: 'Not Complete'
      }
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          <form className="form-inline">
            <div className="form-group">
              <div className="input-group">
                <input
                  ref={(ref) => this.subgroup = ref}
                  type="text"
                  className="form-control"
                  defaultValue={subgroup}
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={this.onSubgroupClick.bind(this)}
                  >
                    <i className="fa fa-save" /> Save Subgroup
                  </button>
                </span>
              </div>
            </div>
            <div className="form-group">
              <FontAwesomeButton
                predicate={isWatchingFn}
                boolValue={isWatching}
                onClick={this.onWatchingClick.bind(this)}
              />
              <FontAwesomeButton
                predicate={isCompleteFn}
                boolValue={isComplete}
                onClick={this.onCompleteClick.bind(this)}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Manage.propTypes = {
  onAnimePropertyChange: PropTypes.func,
  anime: PropTypes.object
};
