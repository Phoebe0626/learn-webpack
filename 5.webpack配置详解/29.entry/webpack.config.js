const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * entry: 入口文件
 *   1. string --> './src/index.js
 *      单入口
 *      打包形成一个 chunk, 输出一个 bundle 文件。
 *      此时 chunk 的名称默认是 main
 * 
 *   2. array --> ['./src/index.js', './src/add.js']
 *      多入口
 *      所有入口文件最终只会形成一个 chunk, 输出出去只有一个 bundle 文件。
 *       --> 一般来讲，只有在 HMR 功能中让 html 热更新生效，才会使用。
 * 
 *   3. object
 *      多入口
 *      有几个入口文件就形成几个 chunk, 输出几个 bundle 文件
 *      此时 chunk 的名称是 key
 * 
 *      --> 特殊用法
 *        {
 *          // 所有入口文件最红只会形成一个 chunk，输出一个 bundle
            index: ['./src/index.js', './src/count.js'],
            // 形成一个 chunk，输出一个 bundle
            add: './src/add.js'
          }
 */

module.exports = {
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}