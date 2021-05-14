const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/**
 * output
 */

module.exports = {
  entry: './src/js/index.js',
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    /**
     * 解析模块路径别名：
     *  优点：简写路径
     *  缺点：路径没有提示
     */
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名 (不建议写 css)
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块的时候去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
}