const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'foreground.html',
      template: 'src/foreground.html',
      chunks: ['foreground'],
    }),
  ],
}
