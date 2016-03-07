import React, { PropTypes } from 'react';
import { Navbar, CollapsibleNav, Nav, NavItem } from 'react-bootstrap';
import LoginStatus from '../components/Account/LoginStatus';
import { Link } from 'react-router';
import Notifications from '../components/Notifications';


export default class Layout extends React.Component {

  render() {
    const isLoggedIn = this.context.store
      .getState()
      .user
      .get('isLoggedIn');

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
          <Notifications />
          {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.contextTypes = {
  store: PropTypes.object
};
