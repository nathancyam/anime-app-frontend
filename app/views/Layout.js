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
              <NavItem eventKey={1}>
                <Link to="/anime"><i className="fa fa-tv" /> Anime</Link>
              </NavItem>
              <NavItem eventKey={2}>
                <Link to="/torrents"><i className="fa fa-download" /> Torrents</Link>
              </NavItem>
              <NavItem eventKey={3}>
                <Link to="/torrents/server"><i className="fa fa-server" /> Torrent Server</Link>
              </NavItem>
              <NavItem eventKey={4}>
                <Link to="/settings"><i className="fa fa-cogs" /> Settings</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}>
                <LoginStatus isLoggedIn={isLoggedIn} />
              </NavItem>
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
