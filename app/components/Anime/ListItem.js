import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

class AnimeStatus extends React.Component {
  render() {
    let subgroup = this.props.anime.get('designated_subgroup');
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
                    key={`${icon}-${index}`}></i>;
          })
        }
        </div>
        <div className="subgroup">{subgroup}</div>
      </div>
    );
  }
}

AnimeStatus.propTypes = {
  anime: React.PropTypes.object,
  statusProperties: React.PropTypes.object
};

export default class ListItem extends React.Component {

  render() {
    const { anime } = this.props;
    const animeId = anime.get('_id');
    const title = anime.get('title');
    const imageUrl = anime.get('image_url');

    return (
      <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
        <Link className="anime-item-link" to={`/anime/${animeId}`}>
          <div className="anime-item">
            <img src={`${this.props.mediaRoot}${imageUrl}`} />
            <div className="content">
              <div className="title">{title}</div>
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

ListItem.propTypes = {
  anime: React.PropTypes.object
};
