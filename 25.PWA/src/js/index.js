import { mul } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(2, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

/**
 * 问题：
 * 1.eslint 不认识 window navigator 全局变量
 *   解决：需要修改 package.json 中 eslintConfig 配置
 *    "env": {
        "browser": true // 支持浏览器端全局变量
      },
 * 2. sw 代码必须运行在服务器上
        --> nodejs
        --> npm i serve -g
            serve -s build 启动服务器，将 build 目录下所有资源作为静态资源暴露出去
 */
// 注册 serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了');
      }).catch(() => {
        console.log('sw注册失败了');
      });
  });
}
