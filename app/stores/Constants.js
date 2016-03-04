import fetch from 'isomorphic-fetch';

export var hostname = "http://localhost:1337/api";
export var fetchApi = (url, headers = {}) => {
  let defaults = {
    headers: {
      'Authorization': 'Basic YW5pbWVhcHA6TTJ3SVNveVBmUA==',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return fetch(url, Object.assign({}, defaults, headers));
};