import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash/assign';
import { Link } from 'react-router';
import LazyImg from '../Image/LazyImg';

const listItemPropTypes = {
  anime: PropTypes.object,
  onDeleteAnime: PropTypes.func
};

export function AnimeStatus({ anime, statusProperties }) {
  let subgroup = anime.get('designated_subgroup');
  let icons = Object.keys(statusProperties)
    .filter((el) => {
      return Boolean(anime.get(el));
    })
    .map((el) => {
      return {
        [el]: statusProperties[el]
      };
    })
    .reduce(assign, {});

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

ListItem.propTypes = listItemPropTypes;

AnimeStatus.propTypes = {
  anime: React.PropTypes.object,
  statusProperties: React.PropTypes.object
};


function ListItem ({ anime, onDeleteAnime }) {
  const animeId = anime.get('_id');
  const title = anime.get('title');
  const imageUrl = anime.get('image_url');

  const _onDeleteAnime = (event) => {
    event.preventDefault();
    onDeleteAnime(animeId);
  };

  return (
    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
      <Link className="anime-item-link" to={`/anime/${animeId}`}>
        <div className="anime-item">
          <LazyImg src={imageUrl} />
          <div className="content">
            <div className="title">{title}</div>
            <hr />
            <div>
              <AnimeStatus
                anime={anime}
                statusProperties={{
                    'is_watching': 'fa-eye',
                    'is_complete': 'fa-check'
                  }} />
            </div>
          </div>
          <div className="anime-item-footer">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-danger"
                onClick={_onDeleteAnime}
              >
                <i className="fa fa-trash" />
              </button>
              <button type="button" className="btn btn-info"><i className="fa fa-archive" /></button>
              <button type="button" className="btn btn-warning"><i className="fa fa-star" /></button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListItem;
