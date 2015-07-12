import './stylesheets/app.scss';

import React from 'react';
import Router from 'react-router';
import routes from './components/routes';

main();

function main() {
  var app = document.createElement('div');
  var fontAwesome = document.createElement('link');
  fontAwesome.setAttribute("href", "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
  fontAwesome.setAttribute("rel", "stylesheet");
  document.body.appendChild(app);
  document.head.appendChild(fontAwesome);

  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root />, app);
  });
}
