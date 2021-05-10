const { resolve } = require('path');
const HtmlWebpakPlugin = require('html-webpack-plugin');

// 设置 nodejs 环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /**
       * js 兼容性处理: babel-loader @babel/core
       *  1. 基本 js 兼容性处理： @babel/preset-env
       *     问题: 只能转换基本语法，如 promise 不能转换
       *  2. 全部 js 兼容性处理 --> @babel/polyfill
       *     问题: 我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
       *  3. 需要做兼容性处理的就做: 按需加载 --> corejs
       */
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设： 指示 babel 做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定 core-js 版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpakPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
