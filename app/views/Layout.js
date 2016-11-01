import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LoginStatus from '../components/Account/LoginStatus';
import { Link } from 'react-router';

export default class Layout extends Component {

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
      </div>
    );
  }
}
