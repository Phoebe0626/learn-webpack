const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 处理 css 资源
      {
        test: /.css$/,
        // use 数组中的 loader 从右向左 / 从下向上执行
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 处理 less 文件
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024, // 小于 8kb 的资源 会被 base64 处理
          name: '[hash:10].[ext]', // 输出文件名取 hash 值前 10 位, 取原来的拓展名
          outputPath: 'images', // 输出路径
          esModule: false // 关闭 es6 模块化，开启 commonjs 
        }
      },
      // 处理 html 中的 img 资源
      {
        test: /.html$/,
        loader: 'html-loader' // 处理 html 文件的 img 图片（负责引入 img ，从而能被url-loader进行处理）
      },
      // 处理其它资源
      {
        exclude: /.(css|js|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // 使用 gzip 压缩
    port: 3000,
    open: true
  }
}