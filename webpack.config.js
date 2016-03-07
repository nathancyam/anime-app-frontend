var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
  entry: ['babel-polyfill', path.resolve(ROOT_PATH, 'app/main')],
  resolve: {
    extensions: ['', '.js', '.jsx']
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
      }
    ]
  }
};

if (TARGET === 'build') {
  module.exports = merge(common, {
    module: {
      loaders: [
        {
          // test for both js and jsx
          test: /\.js?$/,
          // use babel loader with Stage 1 features
          loader: 'babel-loader',
          // operate only on our app directory
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, './node_modules/react')
      },
      fallback: path.resolve(__dirname, './node_modules')
    },
    resolveLoader: {
      fallback: path.resolve(__dirname, './node_modules')
    },
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
