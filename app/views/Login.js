/**
 * Created by nathanyam on 5/03/2016.
 */

import React, { Component } from 'react';

export default class Login extends Component {

  loginRequest(event) {
    event.preventDefault();
    this.props.login(this.username.value, this.password.value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-4 col-sm-push-4">
          <h1>Login</h1>
          <form onSubmit={this.loginRequest.bind(this)}>
            <div className="form-group">
              <label>Email</label>
              <input ref={(ref) => this.username = ref} type="text" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input ref={(ref) => this.password = ref} type="password" name="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fa fa-sign-in" /> Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
