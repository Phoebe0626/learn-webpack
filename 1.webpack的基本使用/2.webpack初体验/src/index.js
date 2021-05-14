/**
 * index.js: webpack 入口文件
 * 
 * 1. 运行指令：
 *    开发环境：webpack ./src/index.js -o ./build --mode=development
 *      webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
 *      整体打包环境，是开发环境
 *    生产环境：webpack ./src/index.js -o ./build --mode=production
 * 
 * 2. 结论
 *   1) webpack 能处理 js/json, 不能处理 css/img 等其它资源
 *   2) 生产环境和开发环境能将 ES6 模块化编译成浏览器能识别的模块化
 *   3) 生产环境比开发环境多一个压缩 js 代码
 */


function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
