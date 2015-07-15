import './stylesheets/app.scss';

import React from 'react';
import Router from 'react-router';
import routes from './components/routes';

main();

function main() {
  var app = document.createElement('div');
  document.body.appendChild(app);

  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root />, app);
  });
}
