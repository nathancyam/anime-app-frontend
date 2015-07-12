import React from 'react';
import { Navbar, CollapsibleNav, Nav, NavItem } from 'react-bootstrap';
import { RouteHandler, Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="app-navbar" brand='Anime App' toggleNavKey={0}>
          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <NavItem eventKey={1}>
                <Link to="torrents">Torrents</Link>
              </NavItem>
              <NavItem eventKey={2}>
                <Link to="anime">Anime</Link>
              </NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <div className="application container">
          <h1>Anime App</h1>
          <RouteHandler />
        </div>
      </div>
    );
  }
}
