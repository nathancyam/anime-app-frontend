import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import NotificationContainer from '../components/Notifications/Container';

class Layout extends Component {

  render() {
    const isLoggedIn = this.props.auth.get('isLoggedIn');

    return (
      <div>
        <ul className="navigation">
          <li role="presentation">
            <Link to="/anime"><i className="fa fa-tv" /> Anime</Link>
          </li>
          <li role="presentation">
            <Link to="/torrents"><i className="fa fa-download" /> Torrents</Link>
          </li>
          <li role="presentation">
            <Link to="/torrents/server"><i className="fa fa-server" /> Torrent Server</Link>
          </li>
          <li role="presentation">
            <Link to="/settings"><i className="fa fa-cogs" /> Settings</Link>
          </li>
        </ul>
        <input type="checkbox" className="nav-trigger" id="nav-trigger"/>
        <label id="nav-icon" htmlFor="nav-trigger" className="navbar-toggle">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
        <Navbar className="app-navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Anime App</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="application container">
          {this.props.children}
        </div>
        <NotificationContainer notifications={this.props.notifications} />
      </div>
    );
  }
}

Layout.propTypes = {
  notifications: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
  auth: PropTypes.object,
};

export default Layout;
