import { connect } from 'react-redux';
import AnimeCollection from '../views/AnimeCollection';
import Immutable from 'immutable';
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
    _meta: Immutable.fromJS({ title: 'Anime Collection '}),
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
)(AnimeCollection);