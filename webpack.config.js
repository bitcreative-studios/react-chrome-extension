const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')

const DEV_MODE = process.env.NODE_ENV !== 'production'
module.exports = {
  mode: DEV_MODE ? 'development' : 'production',
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    historyApiFallback: true,
  },
  entry: {
    popup: path.resolve(__dirname, './src/index-popup.js'),
    options: path.resolve(__dirname, './src/index-options.js'),
    foreground: path.resolve(__dirname, './src/index-foreground.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options.html',
      chunks: ['options'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '[name].[ext]' },
        { from: 'src/background.js', to: '[name].[ext]' },
        { from: 'src/inject-script.js', to: '[name].[ext]' },
        { from: 'src/**/*.png', to: '[name].[ext]' },
      ],
    }),
  ],
}
