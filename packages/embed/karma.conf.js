const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'test/unit/**/*.test.js'
    ],
    reporters: ['spec', 'coverage'],
    preprocessors: {
      'test/unit/**/*.test.js': ['webpack'],
    },
    coverageReporter: {
      dir: './build/coverage/',
      reporters: [{
        type: 'html',
        subdir: 'report-html'
      }, {
        type: 'text-summary',
        subdir: 'report-text',
        file: 'text-summary.txt'
      }, {
        type: 'text',
        subdir: 'report-text',
        file: 'text.txt'
      }, ]
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [{
          test: /\.js$/,
          exclude: [/node_modules/, /\.test\.js$/, /mocks/],
          loader: 'isparta'
        }],
        loaders: webpackConfig.module.loaders
      },
      plugins: webpackConfig.plugins,
      resolve: webpackConfig.resolve
    },
    webpackServer: {
      noInfo: true
    }
  });
};