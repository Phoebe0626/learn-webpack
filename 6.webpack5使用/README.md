### 七、Webpack5 介绍和使用
此版本重点关注一下内容：
* 通过持久缓存提高构建性能
* 使用更好的算法和默认值来改善捆绑包大小
* 通过更好的树摇和代码生成来改善捆绑包大小
* 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改
* 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用v5

#### 自动删除 Node.js Polyfills
早期，webpack 的目标是允许在浏览器中运行大多数的 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

> webpack5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：
* 尽可能尝试使用与前端兼容的模块
* 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

#### Chunk 和模块 ID
> 添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

    chunkIds: "determenistic", moduleIds: "deterministicc"

#### Chunk ID
你可以不用使用`import(/* webpackChunkName: "name" */ "module")`在开发环境来为 chunk 命名，生产环境还是有必要的。
> webpack 内部有 chunk 命名规则，不再是以id(0, 1, 2)命名了。

#### Tree Shaking
1. webpack 现在能够处理对嵌套模块的 tree shaking
```javascript
//inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';

//user.js
import * as module from './module';
console.log(module.inner.a);
```
在生产环境中，inner 模块暴露的 b 会被删除

2. webpack 现在能够处理好多个模块之前的关系
```javascript
import { something } from './something';
function usingSomething() {
    return something;
}

export function test() {
    return usingSomething();
}
```
当设置了`"sideEffects": false`时，一旦发现 `test` 方法没有使用，不但删除`test`，还会删除`"./something"` （webpack4 不会删除）

> 3. webpack 现在能处理对 Commonjs的 tree shaking

#### Output
webpack4 默认只能输出 ES5 代码
> webpack5 开始新增一个属性 `output.ecmaVersion`，可以生成 ES5 和 ES6 / ES2015 代码。

如：`output.ecmaVersion: 2015`

#### SplitChunk
```javascript
// webpack4
miniSize: 30000;

//webpack5
miniSize: {
    javascript: 30000,
    style: 50000
}
```

#### Caching
```javascript
// 配置缓存
cache: {
    // 磁盘存储
    type: "filesystem",
    buildDependencies: {
        // 当配置修改时，缓存失败
        config: [__filename]
    }
}
```
> 缓存将存储到 `node_modules/.cache/webpack`

#### 监视输出文件
之前 webpack 总是在第一次构建时输出前部文件，但是监视重新构建时只会更新修改的文件。
> 现在会在第一次构建时找到输出文件看是否有变化，从而决定要不要输出全部文件。
    
#### 默认值
```javascript
entry: './src/index.js',
output.path: path.resolve(__dirname, 'dist'),
output.filename: "[name].js"
```