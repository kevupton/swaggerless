var path = require('path');

module.exports = {
  entry: './handler.ts',
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015']
        }
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
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