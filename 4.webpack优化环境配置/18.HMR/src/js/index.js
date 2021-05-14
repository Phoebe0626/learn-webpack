import '../css/iconfont.css';
import '../css/index.less';
import print from './print'

console.log('index.js文件被重新加载了');

print();

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));

if (module.hot) {
  // 一旦 module.hot 为 true，说明开启了 HMR 功能 --> 让 HMR 功能代码生效
  module.hot.accept('./print.js', function () {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其它模块不会重新打包构建。
    // 会执行后面的回调函数
    print();
  })
}