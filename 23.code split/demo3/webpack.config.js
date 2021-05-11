const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  /**
   * 可以将 node_modules 中代码单独打包成一个 chunk 最终输出
   * 自动分析多入口 chunk 中，有没有公共的文件。如果有会打包成一个单独的 chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production',
}