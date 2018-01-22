import * as path from 'path'
import { resolve } from 'url'

const PREFIX = `\0virtual:`
const findOrder = [
  '',
  '.mjs', '.js', '.json', '.node',
  '/index..mjs', '/index.js', '/index.json', '/index.node'
]

export default function virtual (modules) {
  const resolvedIds = new Map()

  Object.keys(modules).forEach(id => {
    resolvedIds.set(path.resolve(id), modules[id])
  })

  return {
    name: 'tree-shaking',

    resolveId (id, importer) {
      if (id in modules) return PREFIX + id
      if (importer) {
        if (importer.startsWith(PREFIX)) {
          importer = importer.slice(PREFIX.length)
        }

        const resolved = path.resolve(path.dirname(importer), id)

        for (let extname of findOrder) {
          const filePath = resolved + extname
          if (resolvedIds.has(filePath)) return PREFIX + filePath
        }
      }
    },

    load (id) {
      if (id.startsWith(PREFIX)) {
        id = id.slice(PREFIX.length)

        return id in modules ? modules[id] : resolvedIds.get(id)
      }
    }
  }
}
