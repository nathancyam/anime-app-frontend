import React, { Component } from 'react';

export default class extends Component {

  constructor(props) {
    super(props);
    this.handleWebPushChange = this.handleWebPushChange.bind(this);
  }

  componentDidMount() {
    document.title = 'Settings | Anime App';
  }

  submitSettings = (event) => {
    event.preventDefault();
    const oldSettings = this.props.auth.getIn(['user', 'settings']);
    this.props.submitSettings({
      changes: { isWebPushEnabled: this.isWebPushEnabled },
      oldSettings,
    });
  };

  handleWebPushChange() {
    this.props.handleWebPushChange(this.isWebPushEnabled);
  }

  render() {
    const settings = this.props.auth.getIn(['user', 'settings']);

    return (
      <div className="row view">
        <div className="col-xs-12">
          <h1>Settings</h1>
          <form onSubmit={this.submitSettings}>
            <div className="form-group">
              <label htmlFor="redis-api-key">Redis API Key</label>
              <input type="text" className="form-control" name="redis-api-key" value={settings.get('redisApiKey')} readOnly/>
            </div>
            <div className="form-group">
              <label htmlFor="enable-web-notifications">Enable Web Notifications</label>
              <input
                type="checkbox"
                name="webpush"
                className="checkbox"
                ref={ref => this.isWebPushEnabled = ref}
                onChange={this.handleWebPushChange}
              />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
