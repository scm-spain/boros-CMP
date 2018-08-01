import webpack from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const nodeEnv = process.env.NODE_ENV || 'dev'

const getMajorVersionFromPackageJsonVersion = () => {
  return JSON.stringify(process.env.npm_package_version.split('.')[0])
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'cmp.' + nodeEnv.replace(/"/g, '') + '.js',
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
    new CleanWebpackPlugin(['dist'], {verbose: true})
  ]
}
