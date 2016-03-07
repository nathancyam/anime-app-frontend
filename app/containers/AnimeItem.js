import { connect } from 'react-redux';
import AnimeItem from '../views/AnimeItem';
import Immutable from 'immutable';
import {
  fetchAnimeEpisodes
} from '../actions/Episode';


const mapStateToProps = ({ anime, episodes }, { params }) => {
  const animeId = params.animeId;
  const selectedAnime = anime.filter(el => el.get('_id') == animeId)
    .reduce((carry, item) => item);

  const selectedEpisodes = episodes.has(animeId)
    ? episodes.get(animeId)
    : Immutable.List();

  return {
    episodes: selectedEpisodes,
    anime: selectedAnime
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnimeEpisodes(animeId) {
      dispatch(fetchAnimeEpisodes(animeId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeItem);
