const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 缓存：
 *  babel 缓存
 *    cacheDirectory: true
 *    --> 让第二次打包构建速度更快
 *  文件资源缓存
 *    hash: 每次 webpack 打包会生成一个唯一的 hash 值
 *    问题: 因为 js 和 css 同时使用一个 hash 值，
 *         如果重新打包，会导致所有缓存失效。（可能我只改动了一个文件）
 *    chunkhash: 根据 chunk 生成的 hash 值。如果打包来源于同一个 chunk，那么 hash 值就一样
 *      问题: js 和 css 的 hash 值还是一样的
 *           因为 css 是在 js 中被引入的，所以同属于一个 chunk
 *    contenthash: 根据文件的内容生成 hash 值。不同文件 hash 值一定不一样
 *    --> 让代码上线运行缓存更好使用
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
              ],
              // 开启 babel 缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
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
    })
  ],
  mode: 'production',
  devtool: 'source-map'
}