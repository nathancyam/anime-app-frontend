/*jslint node: true*/
"use strict";

import express from 'express';
import http from 'http'
import httpProxy from 'http-proxy';
import { routes } from './routes';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { configureStore } from './stores';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { getUser } from './decorators/auth';
import { renderPage } from './helpers';

let app = express();
let apiProxy = httpProxy.createProxyServer({ ws: true });
const httpServer = http.createServer(app);

/**
 * @param {Object} renderProps
 * @param {express.Request} req
 * @returns {Promise.<Object>}
 */
async function fetchData(renderProps, req) {
  let connectComponent = renderProps.components[renderProps.components.length - 1];
  let activeComponent = connectComponent.WrappedComponent;

  let auth = await getUser(req.headers);

  if (activeComponent.fetchData) {
    let data = await activeComponent.fetchData(renderProps);
    return Object.assign({}, { auth }, data);
  } else {
    return { auth };
  }
}

app.set('port', 1337);
app.use(express.static(__dirname + '/../public'));

app.use('/build', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:8081' }, err => {
    if (err) {
      console.error(err);
    }
  });
});

app.use('/api', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:3000' }, err => {
    if (err) {
      console.error(err);
    }
  });
});

app.use('/socket.io/*', (req, res) => {
  console.log(`Web request for socket.io`);
  apiProxy.web(req, res, { target: 'http://localhost:3000/socket.io' }, err => {
    if (err) {
      console.error(err);
      console.error(req);
    }
  });
});

httpServer.on('upgrade', (req, res) => {
  console.log(`Upgrade request for sockets`);
  apiProxy.ws(req, res, { target: 'http://localhost:3000/socket.io' });
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
      fetchData(renderProps, req)
        .then(initialData => {
          try {
            store = configureStore(memoryHistory, initialData);
            const content = renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps}/>
              </Provider>
            );
            return res.status(200).send(renderPage(content, initialData));
          } catch (err) {
            return res.status(500).send(`<pre>${err.stack}</pre>`);
          }
        })
        .catch(error => {
          return res.status(500).send(error);
        });
    }
  });
});

const cluster = require('cluster');

if (process.env.NODE_ENV !== 'production') {
  httpServer.listen(app.get('port'), err => {
    if (err) {
      console.error(err);
    }

    console.log(`Render server listening on port: ${app.get('port')}`);
  });
}

if (process.env.NODE_ENV === 'production') {
  if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
  } else {
    httpServer.listen(app.get('port'), err => {
      if (err) {
        console.error(err.message);
      }

      console.log(`Render server listening on port: ${app.get('port')}`);
    });
  }
}

