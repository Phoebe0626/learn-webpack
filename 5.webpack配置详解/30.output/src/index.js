
import count from './count';

console.log('index.js文件加载了~');

import('./add').then(({ default: add }) => {
  console.log(add(1, 2));
})

console.log(add(1, 2));
console.log(count(2, 1));
