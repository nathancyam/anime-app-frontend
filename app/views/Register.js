import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Register extends Component {

  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
  }

  loginRequest(event) {
    event.preventDefault();
    this.props.onRegister(this.email.value, this.password.value);
  }

  render() {
    return (
      <div className="row view">
        <div className="col-xs-12 col-sm-4 col-sm-push-4">
          <h1>Register</h1>
          <form onSubmit={this.loginRequest.bind(this)}>
            <div className="form-group">
              <label>Email</label>
              <input ref={(ref) => this.email = ref} type="text" name="email" className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input ref={(ref) => this.password = ref} type="password" name="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fa fa-sign-in" /> Register
            </button>
          </form>
        </div>
      </div>
    );
  }

}

Register.PropTypes = {
  onRegister: PropTypes.func.isRequired
};
