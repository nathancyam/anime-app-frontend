/*jslint node: true*/
"use strict";

import express from 'express';
import httpProxy from 'http-proxy';
import routes from './routes';
import React from 'react';
import fs from 'fs';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

let app = express();
let apiProxy = httpProxy.createProxyServer({});

function renderPage(html, data) {

  data = data.reduce((aggregrate, curr) => {
    return Object.assign({}, aggregrate, curr);
  }, {});

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
        <script src="/bundle.js"></script>
        <script type="text/javascript">
          __INITIAL_DATA__ = ${JSON.stringify(data)};
        </script>
      </body>
    </html>
  `;
}

app.use('/bundle.js', (req, res) => {
  return fs.createReadStream(`${__dirname}/../build/bundle.js`).pipe(res);
});

app.use('/api', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:3000' });
});

app.use('*', (req, res) => {

  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    const promises = props.components
      .filter(component => { return component.fetchData })
      .map(component => { return component.fetchData(props.params) });

    Promise.all(promises)
      .then(data => {
        let appHtml = renderToString(<RouterContext {...props} />);
        return res.send(renderPage(appHtml, data));
      })
      .catch(err => {
        console.error(err);
        return res.status(500).send(err);
      });
  });
});

app.listen(1337, () => {
  console.log('Render server listening on port 1337.');
});
