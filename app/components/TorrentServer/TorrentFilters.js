/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React, { PropTypes } from 'react';

const propTypes = {
  filterNameValue: PropTypes.string.isRequired,
  onFilterByName: PropTypes.func.isRequired
};

function TorrentFilter ({ filterNameValue, onFilterByName }) {
  return (
    <input type="text" placeholder="Filter by name" value={filterNameValue}
           className="form-control"
           onChange={onFilterByName} />
  );
}

TorrentFilter.propTypes = propTypes;

export default TorrentFilter;
