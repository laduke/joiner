#!/usr/bin/env node

import App from './src/index.js'
import { config as loadsConfig } from './src/loads-config.js'
import { logger } from './src/logger.js'

const { tokenPath, urls, files, watch } = loadsConfig()

run()

async function run () {
  logger.debug('running')

  const config = { tokenPath, urls, files }

  const app = App()
  app.run(config).catch((e) => {
    console.log('error:')
    console.log(e)
  })

  if (watch) {
    await new Promise(resolve => setTimeout(resolve, watch))
    run()
  }
}
