import React from 'react';

class Icon extends React.Component {
  onHoverButton() {
    console.log(this.iconText);
  }

  render () {
    return (
      <button className="btn btn-primary"
        onMouseOver={this.onHoverButton}>
        <i className={this.icon}></i>
        {this.iconText}
      </button>
    );
  }
}

class Watching extends Icon {
  constructor(props) {
    super(props);
    this.iconText = "Watching";
    this.icon = "fa fa-eye";
  }
}

class Complete extends Icon {
  constructor(props) {
    super(props);
    this.iconText = "Complete";
    this.icon = "fa fa-check";
  }
}

export default class ManageAnime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWatching: true,
      isComplete: true
    };
  }

  render () {
    return (
      <div id="manage_anime">
        <form className="form-inline">
          <div className="form-group">
            <Watching />
            <button className="btn btn-primary"
              onClick={this.props.reset}>
              <i className="fa fa-refresh"></i>Sync
            </button>
            <Complete />
            <input type="text" className="form-control" />
          </div>
        </form>
      </div>
    );
  }
}
