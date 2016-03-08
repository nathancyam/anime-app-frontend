/**
 * Created by nathanyam on 8/03/2016.
 */


export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export function searchTorrents(query) {
  return dispatch => {
    dispatch(isFetching(true));


  };
}

