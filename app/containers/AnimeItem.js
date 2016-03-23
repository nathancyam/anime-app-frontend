import { connect } from 'react-redux';
import AnimeItem from '../views/AnimeItem';
import Immutable from 'immutable';
import { fetchAnimeEpisodes } from '../actions/Episode';
import { animePropertyChange } from '../actions/AnimeItems';
import { fetchAnimeNewsNetworkDetails } from '../actions/AnimeNewsNetwork';
import { searchTorrents, enteringQuery, addTorrent, resetTorrents } from '../actions/Torrent';


const mapStateToProps = ({ anime, episodes, animeNewsNetwork, torrents }, { params }) => {
  const animeId = params.animeId;
  const selectedAnime = anime.get('anime')
    .find(el => el.get('_id') == animeId);

  const selectedEpisodes = episodes.has(animeId)
    ? episodes.get(animeId)
    : Immutable.List();

  const annEntry = animeNewsNetwork.has(animeId)
    ? animeNewsNetwork.get(animeId)
    : Immutable.Map();

  return {
    _meta: Immutable.fromJS({ title: selectedAnime.get('title') }),
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
    },
    onAnimePropertyChange(animeId, property, value) {
      dispatch(animePropertyChange(animeId, property, value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeItem);
