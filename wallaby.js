/**
 * Created by nathanyam on 19/07/2016.
 */


module.exports = function (wallaby) {

  return {
    files: [
      {
        pattern: 'node_modules/react/dist/react-with-addons.js',
        instrument: false
      },
      'app/**/*.js',
    ],

    tests: [
      'tests/**/*Test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    setup: function () {
      var jsdom = require('jsdom').jsdom;
      var exposedProperties = ['window', 'navigator', 'document'];

      global.document = jsdom('');
      global.window = document.defaultView;
      Object.keys(document.defaultView).forEach(function (property) {
        if (typeof global[property] === 'undefined') {
          exposedProperties.push(property);
          global[property] = document.defaultView[property];
        }
      });

      global.navigator = {
        userAgent: 'node.js'
      };

      global.documentRef = document;
    }
  };
};
