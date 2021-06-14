'use strict'

const config = require('../config')

const { merge } = require('webpack-merge')
const base = require('./webpack.base')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: config.usePWA ? `${config.public}/pwa.html` : `${config.public}/index.html`,
      filename: './index.html'
    }),
    new ReactRefreshWebpackPlugin()
  ]
  const analyzer = config.useAnalyzer
    ? new BundleAnalyzerPlugin({
      analyzerHost: config.analyzer.host,
      analyzerPort: config.analyzer.port
    })
    : null

  if (analyzer != null) {
    plugins.push(analyzer)
  }
  return plugins
}

module.exports = merge(base, {
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  devServer: {
    publicPath: '/',
    hot: true,
    host: config.devServer.host,
    port: config.devServer.port,
    open: config.devServer.open
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: getPlugins()
})
