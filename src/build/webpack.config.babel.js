import webpack from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const WEBPACK_MODE_PRODUCTION = 'production'
const OUTPUT_DIST_FOLDER = 'dist'
const ENTRY_PATH_CMP = './src/index.js'
const ENTRY_PATH_GLOBAL = './src/global.js'
const OUTPUT_FILENAME_CMP = 'cmp'
const OUTPUT_FILENAME_GLOBAL = 'global'
const OUTPUT_FILENAME_TERMINATION_DEV = '.dev.js'
const OUTPUT_FILENAME_TERMINATION_PRO = '.pro.js'

const getMajorVersionFromPackageJsonVersion = () => {
  return JSON.stringify(process.env.npm_package_version.split('.')[0])
}

// Notice that we are defining multiple entries so naming in output will be processed using [name] substitution by webpack.
let webpackConfig = {
  entry: {
    // This will be set afterwards to be able to use constants when defining the entry keys.
  },
  output: {
    path: path.resolve(OUTPUT_DIST_FOLDER),
    filename: '[name]' + OUTPUT_FILENAME_TERMINATION_DEV,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      CMP_VERSION: getMajorVersionFromPackageJsonVersion()
    }),
    new CleanWebpackPlugin([OUTPUT_DIST_FOLDER], {
      verbose: true,
      root: process.cwd()
    })
  ]
}
webpackConfig.entry[OUTPUT_FILENAME_CMP] = ENTRY_PATH_CMP
webpackConfig.entry[OUTPUT_FILENAME_GLOBAL] = ENTRY_PATH_GLOBAL

module.exports = (env, argv) => {
  if (argv.mode === WEBPACK_MODE_PRODUCTION) {
    webpackConfig.output.filename = '[name]' + OUTPUT_FILENAME_TERMINATION_PRO
  }
  return webpackConfig
}
