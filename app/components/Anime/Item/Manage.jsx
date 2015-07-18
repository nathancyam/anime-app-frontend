import React from 'react';

class Icon extends React.Component {
  render () {
    let icon = this.props.switchState[this.props.initialSwitchState]['icon'];
    let iconText = this.props.switchState[this.props.initialSwitchState]['iconText'];

    return (
      <button className="btn btn-primary">
        <i className={icon}></i>
        {iconText}
      </button>
    );
  }
}

Icon.propTypes = {
  switchState: React.PropTypes.object,
  initialSwitchState: React.PropTypes.string
};

export default class ManageAnime extends React.Component {
  constructor(props) {
    super(props);
    this.onSubGroupChange = this.onSubGroupChange.bind(this);
    this.onSubGroupSave = this.onSubGroupSave.bind(this);
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
    this.props.onSubGroupSave(this.state.subgroup);
  }

  render () {
    return (
      <div id="manage_anime">
        <form className="form-inline">
          <div className="form-group">
            <Icon
              initialSwitchState="on"
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
              initialSwitchState="on"
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
  onSubGroupSave: React.PropTypes.func,
  anime: React.PropTypes.object
};