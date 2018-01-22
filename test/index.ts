import treeShaking from '../src/index'

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
  entry: 'index.js',
  format: 'cjs'
}).then(({ code }) => {
  console.log(code)
}).catch(err => {
  console.error(err)
})
