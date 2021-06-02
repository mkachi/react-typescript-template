'use strict'

const config = require('../config')

const { merge } = require('webpack-merge')
const base = require('./webpack.base')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')

const getPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: config.usePWA ? `${config.public}/pwa.html` : `${config.public}/index.html`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new WebpackManifestPlugin({
      fileName: 'assets.json'
    })
  ]

  if (config.useAnalyzerReport) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'report/report.html',
        generateStatsFile: true,
        statsFilename: 'report/stats.json'
      })
    )
  }

  if (config.useCompression) {
    plugins.push(
      new CompressionPlugin({
        test: /\.(js|css|html)$/,
        deleteOriginalAssets: true,
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }
  return plugins
}

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true
      })
    ]
  },
  plugins: getPlugins()
})
