import { flags } from './flags.js'

export function config () {
  const { url = [], file = [], tokenPath, watch } = flags()

  const urls = [].concat(url)
  const files = [].concat(file)

  return { urls, authTokenPath: tokenPath, files, watch: watch === true ? 30_000 : watch }
}
