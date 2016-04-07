var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);
var outputPath = path.resolve(ROOT_PATH, 'build') + '/';

var common = {
  entry: [
    'babel-polyfill',
    path.resolve(ROOT_PATH, 'app/main'),
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8081'
  ],
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    },
    fallback: path.resolve(__dirname, './node_modules')
  },
  output: {
    path: outputPath,
    publicPath: 'http://localhost:8081/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap')
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
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin()
  ],
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

module.exports = common;
