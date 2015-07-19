import React from 'react';
import { Navbar, CollapsibleNav, Nav, NavItem } from 'react-bootstrap';
import { RouteHandler, Link } from 'react-router';
import Notifications from './Notifications';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="app-navbar"
                brand={<Link to="index">Anime App</Link>}
                toggleNavKey={0}>
          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <NavItem eventKey={1}>
                <Link to="anime">Anime</Link>
              </NavItem>
              <NavItem eventKey={2}>
                <Link to="torrents">Torrents</Link>
              </NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <div className="application container">
          <Notifications />
          <RouteHandler />
        </div>
      </div>
    );
  }
}
