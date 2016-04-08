import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import LoginStatus from '../components/Account/LoginStatus';
import { Link } from 'react-router';

export default class Layout extends Component {

  render() {
    const isLoggedIn = this.props.auth.get('isLoggedIn');
    
    return (
      <div>
        <Navbar className="app-navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Anime App</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
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
            </Nav>
            <Nav pullRight>
              <li role="presentation">
                <LoginStatus isLoggedIn={isLoggedIn} />
              </li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="application container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
