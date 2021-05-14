const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * output
 */

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 的配置
      {
        test: /.css$/,
        // 多个 loader 用 use
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.js$/,
        // 排除 node_modules 下的 js 文件
        exclude: /node_modules/,
        // 只检查 src 下的 js 文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 延后执行
        // enforce: 'post',
        // 单个 loader 用 loader
        loader: 'eslint-loader',
        options: {}
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}