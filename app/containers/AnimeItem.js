import { connect } from 'react-redux';
import AnimeItem from '../views/AnimeItem';
import Immutable from 'immutable';
import { fetchAnimeEpisodes } from '../modules/Episode/actions';
import { animePropertyChange } from '../modules/AnimeItem/actions';
import { fetchAnimeNewsNetworkDetails, updateImage } from '../modules/AnimeNewsNetwork/actions';
import { mapStateToProps as torrentMapStateToProps } from './TorrentList';
import {
  searchTorrents,
  enteringQuery,
  addTorrent,
  resetTorrents,
  changeCurrentPage
} from '../modules/Torrent/actions';


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

  const torrentProps = torrentMapStateToProps({ torrents });

  return {
    _meta: Immutable.fromJS({ title: selectedAnime.get('title') }),
    anime: selectedAnime,
    animeNewsNetwork: annEntry,
    episodes: selectedEpisodes,
    torrents: torrentProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @param animeId
     */
    getAnimeEpisodes(animeId) {
      dispatch(fetchAnimeEpisodes(animeId));
    },

    /**
     *
     * @param query
     * @param animeId
     */
    getAnimeNewsNetworkResponse(query, animeId) {
      dispatch(fetchAnimeNewsNetworkDetails(query, animeId));
    },

    /**
     *
     * @param query
     */
    searchTorrents(query) {
      dispatch(searchTorrents(query));
    },

    /**
     *
     * @param query
     */
    enteringQuery(query) {
      dispatch(enteringQuery(query));
    },

    /**
     *
     * @param torrent
     */
    onAddTorrent(torrent) {
      dispatch(addTorrent(torrent));
    },

    /**
     *
     */
    onResetTorrents() {
      dispatch(resetTorrents());
    },

    /**
     *
     * @param animeId
     * @param property
     * @param value
     */
    onAnimePropertyChange(animeId, property, value) {
      dispatch(animePropertyChange(animeId, property, value));
    },

    /**
     * @param page
     */
    onChangeCurrentPage(page) {
      dispatch(changeCurrentPage(page));
    },

    /**
     * @param {String} animeId
     * @param {String} animeName
     * @param {String} annId
     */
    onUpdateImage(animeId, animeName, annId) {
      dispatch(updateImage(animeId, animeName, annId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeItem);
