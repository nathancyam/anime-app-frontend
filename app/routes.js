import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Layout from './views/Layout';
import TorrentList from './views/TorrentList';
import AnimeList from './views/AnimeList';
import AnimeLayout from './views/AnimeItem';

module.exports = (
  <Route path="/" component={Layout}>
    <IndexRoute name="index" component={AnimeList} />
    <Route path="/torrents" name="torrents" component={TorrentList} />
    <Route path="/anime" name="anime" component={AnimeList} />
    <Route path="/anime/:animeId" name="anime_item" component={AnimeLayout} />
  </Route>
);
