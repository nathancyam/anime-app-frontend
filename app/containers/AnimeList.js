import { connect } from 'react-redux';
import AnimeList from '../views/AnimeList';
import {
  fetchAnime,
  filterByComplete,
  filterByName,
  filterByWatching
} from '../actions/AnimeCollection';

const filterCollectionByName = (collection, name) => {
  return collection.filter(el => {
    return el.get('title').indexOf(name) !== -1;
  });
};

const mapStateToProps = (state) => {
  return {
    anime: state.anime,
    filters: state.filters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnime() {
      dispatch(fetchAnime());
    },

    onFilterByComplete(value) {
      dispatch(filterByComplete(value));
    },

    onFilterByName(name) {
      dispatch(filterByName(name));
    },

    onFilterByWatching(value) {
      dispatch(filterByWatching(value));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeList);