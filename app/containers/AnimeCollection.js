import { connect } from 'react-redux';
import AnimeCollection from '../views/AnimeCollection';
import Immutable from 'immutable';
import { authWrapper } from '../decorators/auth';
import {
  fetchAnime,
  filterByComplete,
  filterByName,
  filterByWatching
} from '../modules/AnimeCollection/actions';
import { deleteAnime } from '../modules/AnimeItem/actions';
import { updateImageRegistry } from '../modules/Ui/actions';

const applyFiltersToCollection = (collection, filters) => {
  return collection.filter(el => {
    return filters.map(filter => filter.get('value') === "reset" || filter.get('predicate')(el))
      .every(el => el === true);
  })
};

const mapStateToProps = (state) => {
  return {
    _meta: Immutable.fromJS({ title: 'Anime Collection '}),
    anime: applyFiltersToCollection(state.anime.get('anime'), state.filters),
    filters: state.filters
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnime() {
      dispatch(fetchAnime());
    },

    onDeleteAnime(animeId) {
      dispatch(deleteAnime(animeId));
    },

    onFilterByComplete(value) {
      dispatch(filterByComplete(value));
    },

    onFilterByName(name) {
      dispatch(filterByName(name));
    },

    onFilterByWatching(value) {
      dispatch(filterByWatching(value));
    },

    handleImageRegistryUpdate() {
      dispatch(updateImageRegistry());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimeCollection);

