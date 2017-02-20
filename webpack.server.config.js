var fs = require('fs');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: ['babel-polyfill', path.resolve(__dirname, 'app', 'server.js')],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.scss', '.js', '.json']
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader!sass-loader?sourceMap'
        })
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css")
  ]

};
