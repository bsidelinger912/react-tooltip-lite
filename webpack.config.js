// const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './example/index.jsx',
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'example'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
};
