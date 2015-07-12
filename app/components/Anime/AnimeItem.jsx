import React from 'react';

export default class AnimeItem extends React.Component {
  render() {
    return (
      <div className="anime-item col-xs-6 col-sm-4 col-md-3">
        <img src={`${this.props.mediaRoot}${this.props.anime.image_url}`} />
        <div>{this.props.anime.title}</div>
      </div>
    );
  }
}

AnimeItem.propTypes = {
  anime: React.PropTypes.object
};
