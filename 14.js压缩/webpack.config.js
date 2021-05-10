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
  plugins: [
    new HtmlWebpakPlugin({
      template: './src/index.html',
    }),
  ],
  // 生产环境下会自动压缩 js 代码
  mode: 'production',
};
