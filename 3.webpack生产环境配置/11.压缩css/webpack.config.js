const { resolve } = require('path');
const HtmlWebpakPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置 nodejs 环境变量
// process.env.NODE_ENV = 'development';


module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          // 'style-loader',
          // 取代 style-loader。作用：提取 js 中的 css 成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          /**
           * css 兼容性处理： postcss => postcss-loader postcss-preset-env
           * 
           * 帮 postcss 找到 package.json 中 browserslist 里面的配置，通过配置加载指定的 css 兼容性样式
           * 
           * "browserslist": {
           *    开发环境 --> 需要设置环境变量：process.env.NODE_ENV = 'development'
                "development": [
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ],
                生产环境: 默认是看生产环境
                "production": [
                  ">0.2%",
                  "not-dead",
                  "not op_mini all"
                ]
              }
           */
          // 使用 loader 的默认配置
          // 'postcss-loader',
          // 修改 loader 的配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpakPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css' // 对输出的内容进行重命名
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development'
}