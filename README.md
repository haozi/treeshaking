# tree-shaking

tree shake es_module in memory

---

## Install

```shell
npm install treeshaking -save-dev
```

## Demo

```javascript
import treeShaking from 'treeshaking'

treeShaking({
  'index.js': `
    import foo from 'foo'
    import bar from './src/bar'
    const baz = 3 // baz will not be output
    console.log(foo, bar)
  `,
  'foo/index.js': `
    export default 1
    export function hello () { // hello will not be output
      alert(hello)
    }
  `,
  'src/bar.js': `
    export default 2
  `
}, {
  entry: 'index.js' // default
}).then(({code}) => {
  console.log(code)
})

```

output:

```javascript
'use strict';

var foo = 1

var bar = 2

console.log(foo, bar);
```

## API

```javascript
treeShaking(modules, options?: Options)
```

## Options

```
interface Options {
  entry?: string,
  format?: 'amd' | 'cjs' | 'es' | 'es6' | 'iife' | 'umd',
  name?: string
}
```
