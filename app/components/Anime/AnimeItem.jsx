import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

class AnimeStatus extends React.Component {
  render() {
    let icons = Object.keys(this.props.statusProperties)
      .filter((el) => {
        return Boolean(this.props.anime[el]);
      })
      .map((el) => {
        return {
          [el]: this.props.statusProperties[el]
        };
      })
      .reduce(_.assign, {});

    return (
      <div className="anime-status">
        <div className="icon-container">
        {
          Object.keys(icons).map((icon, index) => {
            return <i className={`fa ${icons[icon]}`}
                    key={`${icon}-${index}`}></i>
          })
        }
        </div>
        <div className="subgroup">{this.props.anime.designated_subgroup}</div>
      </div>
    );
  }
}

AnimeStatus.propTypes = {
  anime: React.PropTypes.object,
  statusProperties: React.PropTypes.object
};

export default class AnimeItem extends React.Component {
  render() {
    return (
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        <Link className="anime-item-link" to="anime_item" params={{animeId: this.props.anime._id }}>
          <div className="anime-item">
            <img src={`${this.props.mediaRoot}${this.props.anime.image_url}`} />
            <div className="content">
              <div className="title">{this.props.anime.title}</div>
              <hr />
              <div>
                <AnimeStatus
                  anime={this.props.anime}
                  statusProperties={{
                    'is_watching': 'fa-eye',
                    'is_complete': 'fa-check'
                  }} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

AnimeItem.propTypes = {
  anime: React.PropTypes.object
};
