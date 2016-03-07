import { connect } from 'react-redux';
import AnimeItem from '../views/AnimeItem';
import Immutable from 'immutable';
import { fetchAnimeEpisodes } from '../actions/Episode';
import { fetchAnimeNewsNetworkDetails } from '../actions/AnimeNewsNetwork';


const mapStateToProps = ({ anime, episodes, animeNewsNetwork }, { params }) => {
  const animeId = params.animeId;
  const selectedAnime = anime.filter(el => el.get('_id') == animeId)
    .reduce((carry, item) => item);

  const selectedEpisodes = episodes.has(animeId)
    ? episodes.get(animeId)
    : Immutable.List();

  const annEntry = animeNewsNetwork.has(animeId)
    ? animeNewsNetwork.get(animeId)
    : Immutable.Map();

  return {
    episodes: selectedEpisodes,
    anime: selectedAnime,
    animeNewsNetwork: annEntry
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnimeEpisodes(animeId) {
      dispatch(fetchAnimeEpisodes(animeId));
    },
    getAnimeNewsNetworkResponse(query, animeId) {
      dispatch(fetchAnimeNewsNetworkDetails(query, animeId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeItem);
