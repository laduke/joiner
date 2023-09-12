import * as td from 'testdouble'
import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'

test('local networks', async (t) => {
  let subject, zerotierOne

  beforeEach(async () => {
    zerotierOne = await td.replaceEsm('../src/zerotier-one.js')
    subject = await import('../src/loads-local-networks.js')
  })
  afterEach(() => {
    td.reset()
  })

  await t.test('loads local networks', async () => {
    td.when(zerotierOne.getNetworks('token', 1)).thenResolve([1, 2])

    const result = await subject.load('token', 1)
    assert.deepEqual(result, [1, 2])
  })

  await t.test('loads local networks error', async () => {
    td.when(zerotierOne.getNetworks('token', 1)).thenReject(
      new Error('bad token')
    )

    assert.rejects(subject.load('token', 1), { message: 'bad token' })
  })
})
