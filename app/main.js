import './stylesheets/app.scss';

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore, DevTools } from './stores/Redux';
import routes from './routes'

const store = configureStore(browserHistory, window.__INITIAL_DATA__);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);