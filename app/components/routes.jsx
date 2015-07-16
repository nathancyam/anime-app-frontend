import { Route, DefaultRoute, Link } from 'react-router';
import React from 'react';
import Layout from './Layout';
import TorrentList from './Torrents';
import AnimeList from './Anime/AnimeList';
import AnimeLayout from './Anime/Item';

export default (
  <Route handler={Layout}>
    <Route path="torrents" name="torrents" handler={TorrentList} />
    <Route path="anime" name="anime" handler={AnimeList} />
    <Route path="anime/:animeId" name="anime_item" handler={AnimeLayout} />
    <DefaultRoute name="index" handler={AnimeList} />
  </Route>
);
