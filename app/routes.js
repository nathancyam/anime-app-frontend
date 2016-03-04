import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import TorrentList from './components/Torrents';
import AnimeList from './components/Anime/AnimeList';
import AnimeLayout from './components/Anime/Item';

module.exports = (
  <Route path="/" component={Layout}>
    <IndexRoute name="index" component={AnimeList} />
    <Route path="/torrents" name="torrents" component={TorrentList} />
    <Route path="/anime" name="anime" component={AnimeList} />
    <Route path="/anime/:animeId" name="anime_item" component={AnimeLayout} />
  </Route>
);
