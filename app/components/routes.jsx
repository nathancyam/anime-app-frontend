import { Route, DefaultRoute, Link } from 'react-router';
import React from 'react';
import Layout from './Layout';
import TorrentList from './Torrents';
import AnimeList from './Anime/AnimeList';

class About extends React.Component {
  render() {
    return <div>
      About me
      <Link to="index">Home</Link>
    </div>;
  }
}

class Default extends React.Component {
  render() {
    return <div>
      Default
      <Link to="about">About</Link>
    </div>;
  }
}

export default (
  <Route handler={Layout}>
    <Route path="about" name="about" handler={About} />
    <Route path="torrents" name="torrents" handler={TorrentList} />
    <Route path="anime" name="anime" handler={AnimeList} />
    <DefaultRoute name="index" handler={Default} />
  </Route>
);
