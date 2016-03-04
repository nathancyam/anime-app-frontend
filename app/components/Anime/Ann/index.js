import React from 'react';
import AnnStore, { Actions } from '../../../stores/AnimeNewsNetworkStore';
import _ from 'lodash';

export default class AnimeNewsNetwork extends React.Component {

  constructor(props) {
    super(props);
    this.onAnimeSearchUpdate = this.onAnimeSearchUpdate.bind(this);
    this.state = {
      anime: this.props.anime,
      result: {}
    };
  }

  componentDidMount() {
    this.unsubscribe = AnnStore.listen(this.onAnimeSearchUpdate.bind(this));
    Actions.searchAnimeDetails(this.state.anime);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onAnimeSearchUpdate(result) {
    this.setState({ result });
  }

  render () {
    const annResponse = this.state.result;
    if (_.isEmpty(annResponse)) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <i className="fa fa-circle-o-notch fa-spin"
              style={{
                fontSize: "4rem"
              }}></i>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-xs-12">

          <h4>Genres</h4>
          <div>
            {
              annResponse.genres.map((genre, index) => {
                return <span className="label label-primary"
                  style={{margin: "0 0.1rem"}}
                  key={`genre-${index}`}>
                  {genre}
                </span>;
              })
            }
          </div>

          <h4>Themes</h4>
          <div>
            {
              annResponse.themes.map((theme, index) => {
                return <span className="label label-primary"
                  style={{margin: "0 0.1rem"}}
                  key={`theme-${index}`}>
                  {theme}
                </span>;
              })
            }
          </div>

          <h4>Plot Summary</h4>
          <div>
            {annResponse.plot_summary}
          </div>

          <h4>Cast</h4>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Seiyuu</th>
                </tr>
              </thead>
              <tbody>
                {
                  annResponse.cast.map((castMember, index) => {
                    return (
                      <tr key={`cast-${index}`}>
                        <td>{castMember.character}</td>
                        <td>{castMember.seiyuu}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
