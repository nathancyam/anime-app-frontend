import './stylesheets/app.scss';

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './stores';
import { routes } from './routes'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { saveServiceWorkerRegistrationObject } from './modules/ServiceWorker/actions';

const store = configureStore(browserHistory, window.__INITIAL_DATA__, true);
const history = syncHistoryWithStore(browserHistory, store);

window.serviceWorkerOption = {
  scriptURL: '/sw.js'
};
if ('serviceWorker' in navigator && 'PushManager' in window) {
  runtime.register()
    .then(registrationObj => {
      store.dispatch(saveServiceWorkerRegistrationObject(registrationObj))
    });
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
