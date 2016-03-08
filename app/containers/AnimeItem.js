import { connect } from 'react-redux';
import AnimeItem from '../views/AnimeItem';
import Immutable from 'immutable';
import { fetchAnimeEpisodes } from '../actions/Episode';
import { fetchAnimeNewsNetworkDetails } from '../actions/AnimeNewsNetwork';
import { searchTorrents, enteringQuery, addTorrent, resetTorrents } from '../actions/Torrent';


const mapStateToProps = ({ anime, episodes, animeNewsNetwork, torrents }, { params }) => {
  const animeId = params.animeId;
  const selectedAnime = anime.get('anime')
    .filter(el => el.get('_id') == animeId)
    .reduce((carry, item) => item);

  const selectedEpisodes = episodes.has(animeId)
    ? episodes.get(animeId)
    : Immutable.List();

  const annEntry = animeNewsNetwork.has(animeId)
    ? animeNewsNetwork.get(animeId)
    : Immutable.Map();

  return {
    anime: selectedAnime,
    animeNewsNetwork: annEntry,
    episodes: selectedEpisodes,
    torrents: torrents
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnimeEpisodes(animeId) {
      dispatch(fetchAnimeEpisodes(animeId));
    },
    getAnimeNewsNetworkResponse(query, animeId) {
      dispatch(fetchAnimeNewsNetworkDetails(query, animeId));
    },
    searchTorrents(query) {
      dispatch(searchTorrents(query));
    },
    enteringQuery(query) {
      dispatch(enteringQuery(query));
    },
    onAddTorrent(torrent) {
      dispatch(addTorrent(torrent));
    },
    onResetTorrents() {
      dispatch(resetTorrents());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeItem);
