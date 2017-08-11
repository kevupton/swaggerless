var path = require('path');

module.exports = {
  entry: './handler.ts',
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: [/node_modules/]
      },
      { test: /\.json$/, loader: 'json-loader' },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: 'handler.js'
  }
};