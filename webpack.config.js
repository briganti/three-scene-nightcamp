const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'index.js'),
  demo: path.join(__dirname, 'demo.js'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  entry: {
    demo: PATHS.demo,
    app: [PATHS.app],
  },
  devtool: 'eval-source-map',
  output: {
    path: PATHS.build,
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      { test: __dirname,
        exclude: /(node_modules|asset)/,
        loader: 'babel-loader' },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
  resolve: {
    root: [
      __dirname,
    ],
    modulesDirectories: [
      'node_modules',
    ],
  },
};
