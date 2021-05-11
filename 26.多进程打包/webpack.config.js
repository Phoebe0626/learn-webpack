const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/**
 * PWA：渐进式网络开发应用程序（离线可访问）
 *    workbox --> workbox-webpack-plugin
 */

// 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// 复用 loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在 package.json 中定义 browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        /**
         * 正常来讲，一个文件只能被一个 loader 处理
         * 当一个文件要被多个 loader 处理，那么一定要指定 loader 执行的顺序
         *   先执行 eslint 再执行 babel
         */ 
        /*
          在 package.json 中 配置eslintConfig
          "eslintConfig": {
            "extends": "airbnb-base"
          }
        */
        test: /.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下 loader 只会匹配一遍
        // 注意：不能有两项配置处理同一种类型的文件
        oneOf: [
          {
            test: /.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: [
              /** 开启多进程打包 
               * 进程启动时间大概为 600ms，进程通信也有开销
               * 只有工作消耗时间比较长，才需要多进程打包
              */
              'thread-loader',
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: { version: 3 },
                        targets: {
                          chrome: '60',
                          firefox: '50',
                          ie: '9',
                          safari: '10',
                          edge: '17'
                        }
                      }
                    ]
                  ]
                }
              }
            ]
          },
          {
            test: /.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'images',
              esModule: false
            }
          },
          {
            test: /.html$/,
            loader: 'html-loader'
          },
          {
            exclude: /.(html|js|css|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1. 帮助 serviceworker 快速启动
       * 2. 删除旧的 serviceworker
       * 
       * 生成一个 serviceworker 配置文件
       */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  mode: 'production',
  devtool: 'source-map'
}