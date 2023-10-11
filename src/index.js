import { diff } from './diffs-resources.js'
import { load as loadsResources } from './loads-resources.js'
import { update as updatesResources } from './updates-resources.js'
import { load as loadsAuthToken } from './loads-authtoken.js'
import { logger } from './logger.js'

export default function () {
  async function run (config = {}) {
    const { urls = [], tokenPath, localPort, files = [] } = config

    urls.forEach(url => {
      logger.debug('config url: %s', url)
    })

    files.forEach(file => {
      logger.debug('config file: %s', file)
    })

    const authToken = await loadsAuthToken(tokenPath)

    if (!urls.length && !files.length && process.stdin.isTTY) {
      throw new Error('No remote urls or files provided. And not using stdin. Use --file or --url')
    }

    if (!authToken) {
      throw new Error(`No authtoken loaded. Path was ${tokenPath}`)
    }

    const { local, remote } = await load({ urls, files, authToken, localPort })

    const { added, removed } = diff(local, remote)
    added.forEach(a => {
      logger.debug('added: %s', a.id)
    })

    removed.forEach(a => {
      logger.debug('removed: %s', a.id)
    })

    const { joined, left } = await update(
      { authToken, localPort },
      { added, removed }
    )

    joined.forEach(x => {
      logger.info('joined: %s', x)
    })

    left.forEach(x => {
      logger.info('left: %s', x)
    })

    return { joined, left }
  }

  async function load (config) {
    return loadsResources(config)
  }

  async function update (config, updates) {
    return updatesResources(config, updates)
  }

  return {
    run
  }
}
