import React from 'react';
import AnimeItemStore, { Actions } from '../../stores/AnimeItemStore';
import _ from 'lodash';

export default class AnimeLayout extends React.Component {

  constructor(props) {
    super(props);
    this.onAnimeItemLoad = this.onAnimeItemLoad.bind(this);
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
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-8">
          <div className="row">
            <div className="col-xs-12">
              {
                anime.episodes.map((episode, key) => {
                  return <div key={`episode-${key}`}>
                    {episode.fileName} - {episode.number}
                  </div>;
                })
              }
            </div>
            <div className="col-xs-12"></div>
          </div>
        </div>
      </div>
    );
  }
}