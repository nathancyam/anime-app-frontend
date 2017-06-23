import React from 'react';
import { Route, IndexRoute } from 'react-router'
import { requireAuth } from './decorators/auth';
import Layout from './containers/Layout';
import TorrentList from './containers/TorrentList';
import Settings from './containers/Settings';
import AnimeCollection from './containers/AnimeCollection';
import TorrentServer from './containers/TorrentServer';
import AnimeItem from './containers/AnimeItem';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Register from './containers/Register';

export const routes = (
  <Route path="/" component={Layout}>
    <Route path="/torrents" name="torrents" component={requireAuth(TorrentList)} />
    <Route path="/torrents/server" name="torrentServer" component={requireAuth(TorrentServer)} />
    <Route path="/anime" name="anime" component={requireAuth(AnimeCollection)} />
    <Route path="/anime/:animeId" name="anime_item" component={requireAuth(AnimeItem)} />
    <Route path="/settings" component={requireAuth(Settings)} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/register" component={Register} />
    <IndexRoute name="index" component={requireAuth(AnimeCollection)} />
  </Route>
);
