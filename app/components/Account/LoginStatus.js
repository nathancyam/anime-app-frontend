/**
 * Created by nathanyam on 5/03/2016.
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LoginStatus extends Component {

  renderLink() {
    if (this.props.isLoggedIn) {
      return (<Link to="/logout"><i className="fa fa-sign-out" /> Logout</Link>);
    } else {
      return (<Link to="/login"><i className="fa fa-sign-in" /> Login</Link>);
    }
  }

  render() {
    return this.renderLink();
  }
}
