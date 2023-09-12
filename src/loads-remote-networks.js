import readline from 'node:readline'

import { getNetworks } from './http-client.js'
import { read } from './read-file.js'

export async function load (urls = []) {
  const proms = urls.map((url) => getNetworks(url))
  const result = await Promise.all(proms)
  return flatten(result)
}

export async function loadFiles (paths = []) {
  const proms = paths.map((path) => read(path))
  const result = await Promise.all(proms)
    .then(xs => xs.map(x => JSON.parse(x)))

  return flatten(result)
}

export async function loadSTDIN () {
  const rl = readline.createInterface({
    input: process.stdin
  })

  let lines = ''

  setTimeout(() => {
    rl.close()
  }, 100)

  for await (const line of rl) {
    lines = lines.concat(line)
  }

  if (lines.length) {
    return JSON.parse(lines)
  } else {
    return []
  }
}

function flatten (xs = []) {
  return xs.flatMap((el) => {
    return el.networks.map((nw) => {
      return { ...nw, source: el.source }
    })
  })
}
