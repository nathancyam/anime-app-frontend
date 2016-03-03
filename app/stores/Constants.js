export var hostname = "http://anime.itsme.dio";
export var fetch = (url, headers = {}) => {
  let defaults = {
    headers: {
      'Authorization': 'Basic YW5pbWVhcHA6TTJ3SVNveVBmUA==',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return fetch(url, Object.assign({}, defaults, headers));
};