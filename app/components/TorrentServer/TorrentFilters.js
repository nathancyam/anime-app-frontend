/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';

export default ({ filterNameValue, onFilterByName }) => {
  return (
    <input type="text" placeholder="Filter by name" value={filterNameValue}
           className="form-control"
           onChange={onFilterByName} />
  );
};
