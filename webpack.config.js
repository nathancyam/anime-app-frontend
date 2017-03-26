const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const TARGET = process.env.TARGET;
const ROOT_PATH = path.resolve(__dirname);

const common = {
  entry: {
    'bundle': ['babel-polyfill', './app/main.js'],
  },
  output: {
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8081,
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: ['.jsx', '.scss', '.js', '.json'],
    modules: [path.resolve(ROOT_PATH, 'app'), path.resolve(ROOT_PATH, 'node_modules')]
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
      })
    ]
  });
}

module.exports = common;
