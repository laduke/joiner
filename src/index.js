import { diff } from './diffs-resources.js'
import { load as loadsResources } from './loads-resources.js'
import { update as updatesResources } from './updates-resources.js'
import { load as loadsAuthToken } from './loads-authtoken.js'
import { logger } from './logger.js'

export default function () {
  async function run (config = {}) {
    logger.debug('running')
    const { urls = [], tokenPath, localPort, files = [] } = config

    logger.debug('urls %s', urls.join(' '))
    logger.debug('files %s', files.join(' '))

    const authToken = await loadsAuthToken(tokenPath)

    if (!urls.length && !files.length && process.stdin.isTTY) {
      throw new Error('No remote urls or files provided. And not using stdin. Use --file or --url')
    }

    if (!authToken) {
      throw new Error(`No authtoken loaded. Path was ${tokenPath}`)
    }

    const { local, remote } = await load({ urls, files, authToken, localPort })

    const { added, removed } = diff(local, remote)

    const { joined, left } = await update(
      { authToken, localPort },
      { added, removed }
    )

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
