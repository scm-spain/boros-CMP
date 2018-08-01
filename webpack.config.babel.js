import webpack from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const getMajorVersionFromPackageJsonVersion = () => {
  return JSON.stringify(process.env.npm_package_version.split('.')[0])
}

let webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'cmp.dev.js',
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

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    webpackConfig.output.filename = 'cmp.pro.js'
  }
  return webpackConfig
}
