import React, { Component, PropTypes } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import EpisodeList from '../components/Anime/Item/EpisodeList';
import ManageAnime from '../components/Anime/Item/Manage';
import TorrentList from './TorrentList';
import AnimeNewsNetwork from '../components/Anime/Ann';
import { hostname } from '../helpers';
import { factory } from '../services/AnimeItemService';

export default class AnimeItem extends Component {

  static fetchData(state) {
    return new Promise((resolve, reject) => {
      factory(state.params.animeId)
        .getAnimeItemData()
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  componentDidMount() {
    const {
      getAnimeEpisodes,
      getAnimeNewsNetworkResponse,
      anime,
      animeNewsNetwork
    } = this.props;

    getAnimeEpisodes(anime.get('_id'));
    if (animeNewsNetwork.count() === 0) {
      getAnimeNewsNetworkResponse(anime.get('title'), anime.get('_id'));
    }
  }

  render() {
    const { anime, episodes, animeNewsNetwork } = this.props;
    const imageUrl = anime.get('image_url');

    if (anime.count() === 0) {
      return <div className="row">
        <div className="col-xs-12 col-md-4">
          <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "4rem"}} />
        </div>
      </div>;
    }

    return (
      <div className="row anime-item-page">
        <div className="col-xs-12 col-md-4">
          <div className="left">
            <img className="anime-image" src={`${hostname}/${imageUrl}`} />
            <div className="content">
              <h1>{anime.get('title')}</h1>
              <div className="row">
                <div className="col-xs-12">
                  <AnimeNewsNetwork result={animeNewsNetwork} anime={anime} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-8">
          <div className="row">
            <div className="col-xs-12">
              <Accordion defaultActiveKey="2">
                <Panel header="Episodes" eventKey="1">
                  <div className="row">
                    <div className="col-xs-12">
                      <EpisodeList episodes={episodes} />
                    </div>
                  </div>
                </Panel>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AnimeItem.PropTypes = {
  getAnimeEpisodes: PropTypes.func
};
