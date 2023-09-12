import * as td from 'testdouble'
import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'

test('loads resources', async (t) => {
  let subject, loadsLocal, loadsRemote, validateLocal, validateRemote

  beforeEach(async () => {
    loadsLocal = await td.replaceEsm('../src/loads-local-networks.js')
    loadsRemote = await td.replaceEsm('../src/loads-remote-networks.js')
    validateLocal = await td.replaceEsm('../src/validates-local-networks.js')
    validateRemote = await td.replaceEsm('../src/validates-remote-networks.js')

    subject = (await import('../src/loads-resources.js')).load
  })

  afterEach(() => {
    td.reset()
  })

  await t.test('load', async () => {
    const config = { urls: [], authToken: 'a', localPort: 1 }

    td.when(loadsLocal.load('a', 1)).thenResolve(['hi'])
    td.when(loadsRemote.load([])).thenResolve(['1', '2'])

    const result = await subject(config)

    assert.deepEqual(result.local, ['hi'])
    assert.deepEqual(result.remote, ['1', '2'])

    td.verify(validateLocal.validate(['hi']))
    td.verify(validateRemote.validate(['1', '2']))
  })
})
