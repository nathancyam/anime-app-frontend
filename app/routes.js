import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Layout from './views/Layout';
import TorrentList from './containers/TorrentList';
import Settings from './views/Settings';
import AnimeList from './containers/AnimeList';
import AnimeItem from './containers/AnimeItem';
import Login from './containers/Login';

module.exports = (
  <Route path="/" component={Layout}>
    <Route path="/torrents" name="torrents" component={TorrentList} />
    <Route path="/anime" name="anime" component={AnimeList} />
    <Route path="/anime/:animeId" name="anime_item" component={AnimeItem} />
    <Route path="/settings" component={Settings} />
    <Route path="/login" component={Login} />
    <IndexRoute name="index" component={AnimeList} />
  </Route>
);
