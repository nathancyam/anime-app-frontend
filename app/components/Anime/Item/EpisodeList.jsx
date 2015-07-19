import React from 'react';

export default class EpisodeList extends React.Component {
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
                  <td>{episode.fileName}</td>
                  <td>{episode.number}</td>
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
  episodes: React.PropTypes.array
};
