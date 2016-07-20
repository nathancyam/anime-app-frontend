/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React, { PropTypes } from 'react';

const propsTypes = {
  filterNameValue: PropTypes.string.required,
  onFilterByName: PropTypes.func.required
};

function TorrentFilter ({ filterNameValue, onFilterByName }) {
  return (
    <input type="text" placeholder="Filter by name" value={filterNameValue}
           className="form-control"
           onChange={onFilterByName} />
  );
}

TorrentFilter.propTypes = propsTypes;

export default TorrentFilter;
