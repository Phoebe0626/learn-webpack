/**
 * webpack.config.js
 *   作用：指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
 * 
 *   所有构建工具都是基于 nodejs 平台运行的 
 *   模块化默认采用 commonjs
 */

// resolve 用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
  // webpack 配置
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname -> nodejs 的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的 loader 配置
      {
        // 匹配哪些文件
        test: /.css$/,
        // 使用哪些 loader 进行处理
        use: [
          // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
          // 创建一个 style 标签，将 js 中的 css 样式资源插入进去，添加到 head 中生效
          'style-loader',
          // 将 css 文件变成 commonjs 模块加载到 js 中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader' // 将 less 文件编译成 css 文件, 需要下载 less-loader 和 less
        ]
      }
    ]
  },
  // plugins 的配置
  plugins: [
    // 详细的 plugins 配置
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'production' //生产模式
}