import webpack from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const WEBPACK_MODE_PRODUCTION = 'production'
const OUTPUT_CMP_FILENAME_DEV = 'cmp.dev.js'
const OUTPUT_CMP_FILENAME_PRO = 'cmp.pro.js'
const OUTPUT_GLOBAL_FILENAME_DEV = 'global.dev.js'
const OUTPUT_GLOBAL_FILENAME_PRO = 'global.pro.js'
const OUTPUT_DIST_FOLDER = 'dist'

const getMajorVersionFromPackageJsonVersion = () => {
  return JSON.stringify(process.env.npm_package_version.split('.')[0])
}

// Following config object is related with index.js building process.
let indexConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(OUTPUT_DIST_FOLDER),
    filename: OUTPUT_CMP_FILENAME_DEV,
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

// Following config object is related with global.js building process.
let globalConfig = {
  entry: './src/global.js',
  output: {
    path: path.resolve(OUTPUT_DIST_FOLDER),
    filename: OUTPUT_GLOBAL_FILENAME_DEV,
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
  }
}

module.exports = (env, argv) => {
  if (argv.mode === WEBPACK_MODE_PRODUCTION) {
    indexConfig.output.filename = OUTPUT_CMP_FILENAME_PRO
    globalConfig.output.filename = OUTPUT_GLOBAL_FILENAME_PRO
  }
  return [indexConfig, globalConfig]
}
