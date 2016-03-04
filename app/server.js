/*jslint node: true*/
"use strict";

import express from 'express';
import httpProxy from 'http-proxy';
import routes from './routes.jsx';
import React from 'react';
import fs from 'fs';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

let app = express();

function renderPage(html, data) {

  data = data.reduce((aggregrate, curr) => {
    return Object.assign({}, aggregrate, curr);
  }, {});

  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
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

app.use('/bundle.js', (req, res, next) => {
  return fs.createReadStream(`${__dirname}/../build/bundle.js`).pipe(res);
});

app.use('*', (req, res) => {

  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    console.log(props);

    let appHtml = renderToString(<RouterContext {...props} />);
    return res.send(renderPage(appHtml, {}));
  });

  //Router.run(routes, req.path, (Component, state) => {
  //
  //  let promises = state.routes.filter((route) => {
  //    return route.handler.fetchData;
  //  }).map((routeToFetch) => {
  //    return routeToFetch.handler.fetchData(state.params);
  //  });
  //
  //  Promise.all(promises)
  //    .then((data) => {
  //      let html = React.renderToString(<Component data={data} />);
  //      return res.send(renderPage(html, data));
  //    });
  //});
});

app.listen(1337, () => {
  console.log('listening');
});
