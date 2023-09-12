import { getNetworks } from './zerotier-one.js'

export async function load (authtoken, port) {
  return getNetworks(authtoken, port)
}
