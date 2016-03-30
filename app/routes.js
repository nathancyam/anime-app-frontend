import React from 'react';
import { Route, IndexRoute } from 'react-router'
import { requireAuth } from './decorators/auth';
import Layout from './containers/Layout';
import TorrentList from './containers/TorrentList';
import Settings from './views/Settings';
import AnimeCollection from './containers/AnimeCollection';
import TorrentServer from './containers/TorrentServer';
import AnimeItem from './containers/AnimeItem';
import Login from './containers/Login';
import Logout from './containers/Logout';

module.exports = (
  <Route path="/" component={Layout}>
    <Route path="/torrents" name="torrents" component={TorrentList} />
    <Route path="/torrents/server" name="torrentServer" component={TorrentServer} />
    <Route path="/anime" name="anime" component={AnimeCollection} />
    <Route path="/anime/:animeId" name="anime_item" component={AnimeItem} />
    <Route path="/settings" component={requireAuth(Settings)} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <IndexRoute name="index" component={AnimeCollection} />
  </Route>
);
