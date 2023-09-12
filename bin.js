#!/usr/bin/env node

import App from './src/index.js'
import { config as loadsConfig } from './src/loads-config.js'

run()

async function run () {
  const { tokenPath, urls, files } = loadsConfig()

  const config = { tokenPath, urls, files }

  const app = App()
  app.run(config).catch((e) => {
    console.log('error:')
    console.log(e)
  })
}
