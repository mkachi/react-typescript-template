'use strict'

const config = require('../config')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const cssExtractRule = () => [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: {
        auto: true
      }
    }
  }
]

const cssStyleRule = () => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: {
        auto: true
      }
    }
  }
]

const copyRule = () => {
  const files = config.copyAssets

  const result = []
  files.forEach(file => {
    result.push({
      from: `${config.public}/${file}`,
      to: file
    })
  })

  if (config.usePWA) {
    result.push({
      from: `${config.public}/pwa.js`,
      to: 'pwa.js'
    })
  }
  return result
}

const getPlugins = () => {
  const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['build']
    }),
    new CopyWebpackPlugin({
      patterns: copyRule()
    })
  ]

  if (config.extractCSS) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      })
    )
  }

  if (config.useLint) {
    plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'tsx', 'ts', 'tsx'],
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.showLintError
      })
    )
  }

  return plugins
}

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    main: [`${config.src}/App.tsx`]
  },
  output: {
    path: config.out,
    filename: 'scripts/[name].[chunkhash].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: config.extractCSS ? cssExtractRule() : cssStyleRule()
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: [`${config.public}`],
        loader: 'url-loader',
        options: {
          name: 'assets/images/[hash].[ext]',
          limit: config.assets.imageLimit
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        exclude: [`${config.public}`],
        loader: 'url-loader',
        options: {
          name: 'assets/fonts/[hash].[ext]',
          limit: config.assets.fontLimit
        }
      },
      {
        test: /\.(mp4|webm)$/,
        exclude: [`${config.public}`],
        loader: 'url-loader',
        options: {
          name: 'assets/videos/[hash].[ext]',
          limit: config.assets.videoLimit
        }
      },
      {
        test: /\.(ogg|mp3|wav|flac|aac)$/,
        exclude: [`${config.public}`],
        loader: 'url-loader',
        options: {
          name: 'assets/audios/[hash].[ext]',
          limit: config.assets.audioLimit
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: getPlugins()
}
