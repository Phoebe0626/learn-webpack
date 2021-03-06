/**
 * 使用 dll 技术，对某些库（第三方库：jqeury、react、vue...）进行单独打包
 *   当运行 webpack 时，默认查找 webpack.config.js 配置文件
 *   需求：需要运行 webpack.dll.js 文件
 *    --> webpack --config webpack.dll.js
 */

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的 [name] --> jquery
    // ['jquery'] --> 要打包的库是 jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    new webpack.DllPlugin({
      // 打包生成一个 manifest.json --> 提供和 jquery 映射关系
      name: '[name]_[hash]', // 映射的库暴露的名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
}