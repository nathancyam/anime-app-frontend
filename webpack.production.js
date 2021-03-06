var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: {
    app: ['babel-polyfill', path.resolve(ROOT_PATH, 'app/main.js')],
    vendor: [
      'react',
      'react-dom',
      'react-bootstrap',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'immutable',
      'isomorphic-fetch'
    ]
  },
  resolve: {
    extensions: ['.jsx', '.scss', '.js', '.json'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    }
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader?sourceMap'
        })
      },
      {
        // test for both js and jsx
        test: /\.js$/,
        // use babel loader with Stage 1 features
        loader: 'babel-loader',
        // operate only on our app directory
        include: [
          path.resolve(ROOT_PATH, 'app')
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new ServiceWorkerPlugin({
      entry: path.join(__dirname, 'app', 'sw.js')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ]
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
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    ]
  });
}
