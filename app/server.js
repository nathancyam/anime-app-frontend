/*jslint node: true*/
"use strict";

import express from 'express';
import httpProxy from 'http-proxy';
import routes from './routes';
import React from 'react';
import fs from 'fs';
import { renderToString } from 'react-dom/server'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { configureStore } from './stores';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { renderPage } from './helpers';

let app = express();
let apiProxy = httpProxy.createProxyServer({});

/**
 * @param {Object} renderProps
 * @returns {Promise.<Object>}
 */
async function fetchData (renderProps) {
  let connectComponent = renderProps.components[renderProps.components.length - 1];
  let activeComponent = connectComponent.WrappedComponent;

  if (activeComponent.fetchData) {
    return await activeComponent.fetchData(renderProps);
  } else {
    return Promise.resolve({});
  }
}

app.use(express.static(__dirname + '/../public'));

app.use('/build/bundle.js', (req, res) => {
  return fs.createReadStream(`${__dirname}/../build/bundle.js`).pipe(res);
});

app.use('/build/styles.css', (req, res) => {
  return fs.createReadStream(`${__dirname}/../build/styles.css`).pipe(res);
});

app.use('/api', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:3000' });
});

app.use('*', (req, res) => {
  if (req.baseUrl === '/favicon.ico') {
    return res.status(404).send();
  }

  const memoryHistory = createMemoryHistory(req.baseUrl);
  let store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes , location: req.baseUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      fetchData(renderProps)
        .then(initialData => {
          store = configureStore(memoryHistory, initialData);
          const content = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          );
          return res.status(200).send(renderPage(content, initialData));
        })
        .catch(error => {
          return res.status(500).send(error);
        });
    }
  });
});

app.listen(1337, () => {
  console.log('Render server listening on port 1337.');
});
