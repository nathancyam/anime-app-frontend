import './stylesheets/app.scss';

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './stores';
import { routes } from './routes'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const store = configureStore(browserHistory, window.__INITIAL_DATA__);
const history = syncHistoryWithStore(browserHistory, store);

window.serviceWorkerOption = {
  scriptURL: '/sw.js'
};
if ('serviceWorker' in navigator) {
  runtime.register()
    .then(reg => {
      if (!navigator.serviceWorker.controller) {
        return;
      }

      if (reg.waiting) {
        return handleWorker(reg.waiting);
      }

      if (reg.installing) {
        return handleWorker(reg.installing);
      }

      reg.addEventListener('updatefound', () => handleWorker(reg.installing));
    });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}

const handleWorker = (worker) => {
  worker.addEventListener('statechange', () => {

    const payload = {
      type: 'info',
      msg: {
        text: 'A new version is available',
        actions: [
          {
            name: 'Refresh',
            callback: () => worker.postMessage({ action: 'skip_waiting' })
          }
        ]
      }
    };

    if (worker.state === 'installed') {
      store.dispatch({ type: 'SW_INSTALLED', payload });
    }
  });
};

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
