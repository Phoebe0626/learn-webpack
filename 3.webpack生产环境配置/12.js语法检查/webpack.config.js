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
       * 语法检查：eslint-loader（依赖 eslint 库）
       * 注意：只检查自己写的源代码，第三方的库是不用检查的
       * 设置检查规则：
       *   package.json 中 eslintConfig 中设置
       * "eslintConfig": {
            "extends": "airbnb-base"
          }
       *   airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
       */
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 的错误
          fix: true,
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
