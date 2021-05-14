const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

/**
 * output
 */

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name]_[contenthash:10]chunk.js'
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
  mode: 'production',
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    extensions: ['.js', '.json', '.jsx', '.css'],
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 下面是默认值 一般不做修改
      minSize: 30 * 1024, // 分割的 chunk 最小为 30 kb
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的 chunk 最少被引用 1 次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口 js 文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: { // 分割 chunk 的组
        // node_modules 文件会被打包到 vendors 组的 chunk 中 --> vendors~xxx.js
        // 满足上面的公共规则，如：大小要超过 30kb 至少被引用1次
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 打包的优先级
          priority: -10
        },
        default: {
          minChunks: 2, // 要提取的 chunk 最少被引用 2 次
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        }
      }
    },
    // 将当前模块记录其他模块的 hash 值单独打包为一个文件 runtime
    // 解决的问题：修改 a 文件导致 b 文件的 contenthash 变化 
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案： js 和 css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启用 source-map
        sourceMap: true
      })
    ]
  }
}