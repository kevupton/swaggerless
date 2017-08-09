const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'src/**/*.ts',
    ],

    preprocessors: {
      '**/*.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      devtool: 'inline-source-map',
    },

    // Webpack please don't spam the console when running in karma!
    webpackServer: { noInfo: true },

    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  });
};