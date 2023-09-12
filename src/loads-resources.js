import { load as loadLocal } from './loads-local-networks.js'
import { load as loadRemote, loadFiles, loadSTDIN } from './loads-remote-networks.js'
import { validate } from './validates-local-networks.js'
import { validate as validateRemote } from './validates-remote-networks.js'

export async function load ({ urls = [], files = [], authToken, localPort }) {
  const local = await loadLocal(authToken, localPort)
  validate(local)

  const remote1 = await loadRemote(urls)
  validateRemote(remote1)

  const remote2 = await loadFiles(files)
  validateRemote(remote2)

  let remote3 = []
  if (!process.stdin.isTTY) {
    remote3 = await loadSTDIN()
  }

  const remote = remote1.concat(remote2).concat(remote3)
    .filter(id)

  return { local, remote }
}

function id (x) { return x }
