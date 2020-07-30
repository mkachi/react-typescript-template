'use strict'

const path = require('path')

module.exports = {
  src: path.resolve(__dirname, '../src'),
  out: path.resolve(__dirname, '../build'),
  posts: path.resolve(__dirname, '../posts'),
  useLint: true,
  useAnalyzer: false,
  showLintError: true,
  devServer: {
    host: 'localhost',
    port: 9000,
    proxy: 9001
  },
  proxyServer: {
    port: 9001
  },
  analyzer: {
    host: 'localhost',
    port: 9002
  }
}
