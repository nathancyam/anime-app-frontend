import fetch from 'isomorphic-fetch';

export var hostname = "http://localhost:1337/api";

/**
 * @param {String} html
 * @param {Object} data
 * @returns {String}
 */
export function renderPage(html, data = {}) {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <title>Title</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="text/javascript">
          __INITIAL_DATA__ = ${JSON.stringify(data)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
}

/**
 * @returns {Object|null}
 */
export function isLoggedIn() {
  return getStore().getState(user);
}

/**
 * @param {String} url
 * @param {Object} headers
 */
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
