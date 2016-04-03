import fetch from 'isomorphic-fetch';

let _hostname = 'http://localhost:1337/api';
if (process.env.NODE_ENV === 'production') {
  _hostname = 'https://anime.nathanyam.com/api';
}

export const hostname = _hostname;

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
        <link rel="stylesheet" href="/build/styles.css" />
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <title>Anime App</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="text/javascript">
          __INITIAL_DATA__ = ${JSON.stringify(data)};
        </script>
        <script src="/build/bundle.js"></script>
      </body>
    </html>
  `;
}

/**
 * @returns {Object|null}
 */
export function isLoggedIn() {
  return getStore().getState();
}

/**
 * @param {String} url
 * @param {Object} body
 * @param {Object} headers
 */
export var fetchApi = (url, body = {}, headers = {}) => {
  const _headers = Object.assign({}, {
    'Authorization': 'Basic YW5pbWVhcHA6TTJ3SVNveVBmUA==',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, headers);
  
  const _full = Object.assign({}, { headers: _headers }, body);
  return fetch(`${hostname}${url}`, _full);
};
