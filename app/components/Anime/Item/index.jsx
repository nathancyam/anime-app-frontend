import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import AnimeItemStore, { Actions } from '../../../stores/AnimeItemStore';
import _ from 'lodash';
import EpisodeList from './EpisodeList';
import ManageAnime from './Manage';
import TorrentList from '../../Torrents';
import AnimeNewsNetwork from '../Ann';

export default class AnimeLayout extends React.Component {

  constructor(props) {
    super(props);
    this.onAnimeItemLoad = this.onAnimeItemLoad.bind(this);
    this.onAnimePropertyChange = this.onAnimePropertyChange.bind(this);
    this.reset = this.reset.bind(this);
    this.state = { anime: {} };
  }

  componentDidMount() {
    this.unsubscribe = AnimeItemStore.listen(this.onAnimeItemLoad.bind(this));
    Actions.findById(this.props.params.animeId);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onAnimeItemLoad(anime) {
    this.setState({ anime });
  }

  /**
   * @param {Object} propertyChange
   */
  onAnimePropertyChange(propertyChange) {
    let anime = _.assign({}, { _id: this.state.anime._id }, propertyChange);
    Actions.saveAnime(anime);
  }

  reset() {
    Actions.reset(this.props.params.animeId);
  }

  render() {
    const anime = this.state.anime;

    if (_.isEmpty(anime)) {
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
            <img className="anime-image" src={`http://anime.itsme.dio/${anime.image_url}`} />
            <div className="content">
              <h1>{anime.title}</h1>
              <div className="row">
                <div className="col-xs-12">
                  <AnimeNewsNetwork anime={anime} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-8">
          <div className="row">
            <div className="col-xs-12">
              <ManageAnime
                reset={this.reset}
                anime={anime}
                onAnimePropertyChange={this.onAnimePropertyChange} />
            </div>
            <div className="col-xs-12">
              <Accordion defaultActiveKey="2">
                <Panel header="Episodes" eventKey="1">
                  <div className="row">
                    <div className="col-xs-12">
                      <EpisodeList episodes={anime.episodes} />
                    </div>
                  </div>
                </Panel>
                <Panel header="Torrents" eventKey="2">
                  <div className="row">
                    <div className="col-xs-12">
                      <TorrentList initialSearchTerm={anime.title} />
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
