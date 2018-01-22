import { rollup } from 'rollup'
import virtual from './virtual'

interface Options {
  entry?: string,
  format?: 'amd' | 'cjs' | 'es' | 'es6' | 'iife' | 'umd',
  name?: string
}
export default async (modules, options: Options = {
  entry: 'index.js',
  format: 'es',
  name: ''
}) => {
  const bundle = await rollup({
    input: options.entry,
    plugins: [
      virtual(modules)
    ]
  })
  const { code } = await bundle.generate({
    format: options.format,
    name: options.name
  })
  return { code }
}
