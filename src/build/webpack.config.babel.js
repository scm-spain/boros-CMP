const webpack = require('webpack')
const path = require('path')

const ENV = process.env.NODE_ENV || 'development'

const commonConfig = {
  mode: ENV,
  context: path.resolve(__dirname, './../..'),
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]
  },
  optimization: {
    minimize: ENV === 'production'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|src\/webpack)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  stats: {colors: true}
}

module.exports = [
  // CMP config
  {
    entry: {
      cmp: './src/index.js'
    },

    output: {
      path: path.resolve(commonConfig.context, 'dist'),
      filename: '[name]' + (ENV === 'development' ? '.dev' : '') + '.js'
    },
    ...commonConfig,
    plugins: [new webpack.NoEmitOnErrorsPlugin()]
  },
  // GLOBAL mediator config
  {
    entry: {
      global: './src/global.js'
    },

    output: {
      path: path.resolve(commonConfig.context, 'dist'),
      filename: '[name]' + (ENV === 'development' ? '.dev' : '') + '.js'
    },
    ...commonConfig,
    plugins: [new webpack.NoEmitOnErrorsPlugin()]
  }
]
