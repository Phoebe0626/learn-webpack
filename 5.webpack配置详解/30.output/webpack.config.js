const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * output
 */

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称 + 目录）
    filename: 'js/[name].js',
    // 输出的文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入的公共路径前缀 'imgs/a.jpg' --> '/imgs/a.jpg' (一般用于生产模式)
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', // 非入口 chunk 的名称
    library: '[name]', // 整个库向外暴露的变量名
    // libraryTarget: 'window', // 变量名添加到哪个上 browser
    libraryTarget: 'global', // 变量名添加到哪个上 node
    libraryTarget: 'commonjs'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}