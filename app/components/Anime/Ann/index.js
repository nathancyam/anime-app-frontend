import React from 'react';
import PropTypes from 'prop-types';

function AnimeNewsNetwork ({ result }) {
  const annResponse = result;
  if (annResponse.count() === 0) {
    return (
      <div className="row">
        <div className="col-xs-12">
          <i className="fa fa-circle-o-notch fa-spin"
             style={{
               fontSize: "4rem"
             }} />
        </div>
      </div>
    );
  }

  const genres = annResponse.get('genres');
  const themes = annResponse.get('themes');
  const cast = annResponse.get('cast');

  return (
    <div className="row">
      <div className="col-xs-12">

        <h4>Genres</h4>
        <div className="genres">
          {
            genres.map((genre, index) => {
              return <span className="label label-primary"
                           style={{margin: "0 0.1rem"}}
                           key={`genre-${index}`}>
                  {genre}
                </span>;
            })
          }
        </div>

        <h4>Themes</h4>
        <div className="themes">
          {
            themes.map((theme, index) => {
              return <span className="label label-primary"
                           style={{margin: "0 0.1rem"}}
                           key={`theme-${index}`}>
                  {theme}
                </span>;
            })
          }
        </div>

        <h4>Plot Summary</h4>
        <div className="plot-summary">
          {annResponse.get('plot_summary')}
        </div>

        <h4>Cast</h4>
        <div>
          <table className="table cast-table">
            <thead>
            <tr>
              <th>Character</th>
              <th>Seiyuu</th>
            </tr>
            </thead>
            <tbody>
            {
              cast.map((castMember, index) => {
                return (
                  <tr key={`cast-${index}`}>
                    <td>{castMember.get('character')}</td>
                    <td>{castMember.get('seiyuu')}</td>
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

AnimeNewsNetwork.PropTypes = {
  result: PropTypes.object
};

export default AnimeNewsNetwork;
