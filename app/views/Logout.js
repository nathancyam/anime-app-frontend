/**
 * Created by nathanyam on 5/03/2016.
 */

import React, { Component } from 'react';

export default class Logout extends Component {

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return (
      <div className="row view">
        <div className="col-xs-12 col-sm-4 col-sm-push-4">
          <h1>Logging out...</h1>
        </div>
      </div>
    );
  }
}
