import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

class AnimeStatus extends React.Component {
  render() {
    let subgroup = this.props.anime.get('designated_subgroup');
    let icons = Object.keys(this.props.statusProperties)
      .filter((el) => {
        return Boolean(this.props.anime.get(el));
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
            return <i className={`fa ${icons[icon]}`} key={`${icon}-${index}`} />;
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
            <img src={imageUrl} />
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
            <div className="anime-item-footer">
              <div className="btn-group">
                <button type="button" className="btn btn-danger"><i className="fa fa-trash" /></button>
                <button type="button" className="btn btn-info"><i className="fa fa-archive" /></button>
                <button type="button" className="btn btn-warning"><i className="fa fa-star" /></button>
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
