import React, { Component, PropTypes } from 'react';

export default class EpisodeList extends Component {
  render () {
    const episodes = this.props.episodes;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Episode Number</th>
          </tr>
        </thead>
        <tbody>
          {
            episodes.map((episode, index) => {
              return (
                <tr key={`episode-${index}`}>
                  <td>{episode.get('fileName')}</td>
                  <td>{episode.get('number')}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

EpisodeList.propTypes = {
  episodes: PropTypes.object.isRequired
};
