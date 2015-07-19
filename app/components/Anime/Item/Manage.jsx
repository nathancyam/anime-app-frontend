import React from 'react';
import _ from 'lodash';

class Icon extends React.Component {
  render () {
    let icon = this.props.switchState[this.props.initialSwitchState]['icon'];
    let iconText = this.props.switchState[this.props.initialSwitchState]['iconText'];

    return (
      <button
        className="btn btn-primary"
        onClick={this.props.onIconClick}>
        <i className={icon}></i>
        {iconText}
      </button>
    );
  }
}

Icon.propTypes = {
  switchState: React.PropTypes.object,
  initialSwitchState: React.PropTypes.string,
  onIconClick: React.PropTypes.func
};

export default class ManageAnime extends React.Component {
  constructor(props) {
    super(props);
    this.onSubGroupChange = this.onSubGroupChange.bind(this);
    this.onSubGroupSave = this.onSubGroupSave.bind(this);
    this.onWatchingChange = this.onWatchingChange.bind(this);
    this.onCompleteChange = this.onCompleteChange.bind(this);
    this.state = {
      isWatching: true,
      isComplete: true,
      subgroup: this.props.anime.designated_subgroup
    };
  }

  onSubGroupChange(event) {
    this.setState({subgroup: event.target.value});
  }

  onSubGroupSave(event) {
    event.preventDefault();
    this.props.onAnimePropertyChange({designated_subgroup: this.state.subgroup});
  }

  onWatchingChange(event) {
    event.preventDefault();
    let isWatching = false;
    if (!_.isUndefined(this.props.anime.is_watching)) {
      isWatching = this.props.anime.is_watching;
    }

    this.props.onAnimePropertyChange({ is_watching: !isWatching });
  }

  onCompleteChange(event) {
    event.preventDefault();
    let isComplete = false;
    if (!_.isUndefined(this.props.anime.is_complete)) {
      isComplete = this.props.anime.is_complete;
    }

    this.props.onAnimePropertyChange({ is_complete: !isComplete });
  }

  render () {
    const anime = this.props.anime;

    return (
      <div id="manage_anime">
        <form className="form-inline">
          <div className="form-group">
            <Icon
              initialSwitchState={anime.is_watching ? "on" : "off"}
              onIconClick={this.onWatchingChange}
              switchState={{
                on: {
                  icon: "fa fa-eye",
                  iconText: "Watching"
                },
                off: {
                  icon: "fa fa-eye-slash",
                  iconText: "Not Watching"
                }
              }} />
            <button className="btn btn-primary"
              onClick={this.props.reset}>
              <i className="fa fa-refresh"></i>Sync
            </button>
            <Icon
              initialSwitchState={anime.is_complete ? "on" : "off"}
              onIconClick={this.onCompleteChange}
              switchState={{
                on: {
                  icon: "fa fa-check",
                  iconText: "Complete"
                },
                off: {
                  icon: "fa fa-cross",
                  iconText: "Incomplete"
                }
              }} />
            <input type="text" className="form-control"
                   value={this.state.subgroup}
                   onChange={this.onSubGroupChange} />
            <button className="btn btn-success"
              onClick={this.onSubGroupSave}>
              <i className="fa fa-save"></i>
              Save Subgroup
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ManageAnime.propTypes = {
  reset: React.PropTypes.func,
  onAnimePropertyChange: React.PropTypes.func,
  anime: React.PropTypes.object
};