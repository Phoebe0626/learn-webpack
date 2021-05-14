const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 问题：默认是处理不了 html 中的 img 标签的
        test: /.(jpg|png|gif)$/,
        // 使用一个 loader
        // 下载 url-loader file-loader（url-loader 依赖于 file-loader）
        loader: 'url-loader',
        options: {
          // 当发现图片大小小于 8kb，就会被 base64 处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为 url-loader 默认使用 es6 模块化解析，
          // 而 html-loader 引入图片是 commonjs，所以解析时会有问题：[object Module]
          // 解决：关闭 url-loader 的 es6 模块化解析，使用 commonjs 解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]取图片的 hash 值的前 10 位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /.html$/,
        // 处理 html 文件的 img 图片（负责引入 img ，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}