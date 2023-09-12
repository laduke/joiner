import { flags } from './flags.js'

export function config () {
  const { url = [], file = [], tokenPath } = flags()

  const urls = [].concat(url)
  const files = [].concat(file)

  return { urls, authTokenPath: tokenPath, files }
}
