import assert from 'node:assert'

import * as td from 'testdouble'

import { test, beforeEach, afterEach } from 'node:test'
import { createNetworks } from './common.js'

test('remote networks', async (t) => {
  let subject, httpClient

  beforeEach(async () => {
    httpClient = await td.replaceEsm('../src/http-client.js')
    subject = await import('../src/loads-remote-networks.js')
  })
  afterEach(() => {
    td.reset()
  })

  await t.test('loads remote networks', async () => {
    td.when(httpClient.getNetworks('url1')).thenResolve({
      networks: createNetworks([1, 2]),
      source: 'url1'
    })
    td.when(httpClient.getNetworks('url2')).thenResolve({
      networks: createNetworks([3, 4]),
      source: 'url2'
    })

    const result = await subject.load(['url1', 'url2'])
    assert.deepEqual(result, [
      { id: 1, source: 'url1' },
      { id: 2, source: 'url1' },
      { id: 3, source: 'url2' },
      { id: 4, source: 'url2' }
    ])
  })

  await t.test('loads remote networks error', async () => {
    td.when(httpClient.getNetworks('url1')).thenReject(new Error('bad url'))

    assert.rejects(subject.load(['url1']), { message: 'bad url' })
  })
})
