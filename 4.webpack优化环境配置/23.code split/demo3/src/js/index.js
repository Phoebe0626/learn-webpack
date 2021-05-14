function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

/**
 * 通过 js 代码，让某个文件被单独打包成一个 chunk
 * import 动态导入语法：能将某个文件单独打包
 * 
 *   取一个固定名字
 *   /* webpackChunkName: 'test' */

import(/* webpackChunkName: 'test' */'./test')
  .then((result) => {
    // eslint-disable-next-line
    console.log(result);
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败');
  });

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

