'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Merge webpack configuration files
module.exports = (env, argv) => 
  merge(common, {
    entry: {
      popup: PATHS.src + '/popup.js',
      contentScript: PATHS.src + '/contentScript.js',
      background: PATHS.src + '/background.js',
    },
    output: {
    path: env.target_browser == 'firefox' ? PATHS.build_firefox : PATHS.build_chrome,
    filename: "[name].js",
  },
    devtool: argv.mode === 'production' ? false : 'source-map',
    plugins: [
      // fix "process is not defined" error:
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: env.target_browser == 'firefox' ? 'manifest_firefox.json' : 'manifest.json',
            to: 'manifest.json',
            context: 'public',
          },
        ],
      }),
    ],
  });
