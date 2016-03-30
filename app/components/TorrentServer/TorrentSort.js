/**
 * Created by nathanyam on 25/03/2016.
 */

"use strict";

import React from 'react';
import snakeCase from 'lodash/snakeCase';

export default ({ fields, onChangeField, onChangeOrder, currentField, currentOrder }) => {
  const toNormalCase = (string) => {
    return snakeCase(string)
      .split('_')
      .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
      .join(' ');
  };

  return (
    <div className="sort-torrents">
      <div className="col-xs-12 col-sm-2">
        <select className="form-control" onChange={onChangeField} value={currentField}>
          {
            fields.map(field => {
              return <option key={`field_${field}`} value={field}>{toNormalCase(field)}</option>;
            })
          }
        </select>
      </div>
      <div className="col-xs-12 col-sm-2">
        <select className="form-control" onChange={onChangeOrder} value={currentOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};
