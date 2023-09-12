import * as td from 'testdouble'
import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'

test('cli', async (t) => {
  let subject, loadsFlags

  beforeEach(async () => {
    loadsFlags = await td.replaceEsm('../src/flags.js')
    subject = await import('../src/loads-config.js')
  })

  afterEach(() => {
    td.reset()
  })

  await t.test('flags', async () => {
    td.when(loadsFlags.flags()).thenReturn({
      url: ['url1'],
      tokenPath: '/tmp/token'
    })

    assert.deepEqual(subject.config().urls, ['url1'])
    assert.deepEqual(subject.config().authTokenPath, '/tmp/token')
  })
})
