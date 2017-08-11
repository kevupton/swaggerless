const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'src/**/*.spec.ts'
    ],

    preprocessors: {
      '**/*.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      devtool: 'inline-source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env': require('./test.env.json')
        })
      ]
    },

    // Webpack please don't spam the console when running in karma!
    webpackServer: { noInfo: true },
    processKillTimeout: 5000,
    browserDisconnectTimeout: 5000,

    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: 'Infinity'
  });
};