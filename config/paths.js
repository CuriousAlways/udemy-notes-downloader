'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  build_firefox: path.resolve(__dirname, '../build', 'firefox'),
  build_chrome: path.resolve(__dirname, '../build', 'chrome')
};

module.exports = PATHS;
