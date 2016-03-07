import React, { PropTypes } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import EpisodeList from '../components/Anime/Item/EpisodeList';
import ManageAnime from '../components/Anime/Item/Manage';
import TorrentList from './TorrentList';
import AnimeNewsNetwork from '../components/Anime/Ann';
import { factory } from '../services/AnimeItemService';

export default class AnimeItem extends React.Component {

  static fetchData(state) {
    return new Promise((resolve, reject) => {
      factory(state.params.animeId)
        .getAnimeItemData()
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  componentDidMount() {
    const { getAnimeEpisodes, anime } = this.props;
    getAnimeEpisodes(anime.get('_id'));
  }

  render() {
    const { anime, episodes } = this.props;

    if (anime.count() === 0) {
      return <div className="row">
        <div className="col-xs-12 col-md-4">
          <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "4rem"}} />
        </div>
      </div>;
    }

    return (
      <div className="row anime-item-page">
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
