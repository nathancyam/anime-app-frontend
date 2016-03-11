var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: ['babel-polyfill', path.resolve(ROOT_PATH, 'app/main')],
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    },
    fallback: path.resolve(__dirname, './node_modules')
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        // test for both js and jsx
        test: /\.js$/,
        // use babel loader with Stage 1 features
        loader: 'babel',
        // operate only on our app directory
        include: [
          path.resolve(ROOT_PATH, 'app')
        ]
      }
    ]
  },
  resolveLoader: {
    fallback: path.resolve(__dirname, './node_modules')
  }
};

if (TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if (TARGET === 'dev') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    entry: [
      'webpack/hot/dev-server'
    ],
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loaders: ['react-hot', 'babel-loader'],
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    }
  });
}
