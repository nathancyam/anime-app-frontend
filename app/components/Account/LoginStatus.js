/**
 * Created by nathanyam on 5/03/2016.
 */

import React, { Component } from 'React';
import { Link } from 'react-router';
import AuthStore, { Actions } from '../../stores/AuthStore';

export default class LoginStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  componentDidMount() {
    this.unsubscribe = AuthStore.listen();
    Actions.isLoggedIn();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderLink() {
    if (this.state.isLoggedIn) {
      return (<Link to="/logout"><i className="fa fa-sign-out" /> Logout</Link>);
    } else {
      return (<Link to="/login"><i className="fa fa-sign-in" /> Login</Link>);
    }
  }

  render() {
    return this.renderLink();
  }
}
