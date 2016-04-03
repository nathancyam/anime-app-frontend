/**
 * Created by nathanyam on 4/03/2016.
 */

import React, { Component } from 'react';

export default class extends Component {

  componentDidMount() {
    document.title = 'Settings | Anime App';
  }

  render() {
    console.log(this.props);
    const settings = this.props.auth.getIn(['user', 'settings']);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Settings</h1>
          <form>
            <div className="form-group">
              <label htmlFor="redis-api-key">Redis API Key</label>
              <input type="text" className="form-control" name="redis-api-key" value={settings.get('redisApiKey')} readOnly/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
