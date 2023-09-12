import assert from 'node:assert'

import { test } from 'node:test'

import { validate } from '../src/validates-remote-networks.js'

test('validate local networks', async (t) => {
  await t.test('valid', () => {
    const networks = [{ id: '1' }]
    assert.doesNotThrow(() => validate(networks))
  })

  await t.test('invalid throws', () => {
    const networks = [{ noid: '1234' }]

    assert.throws(() => validate(networks))
  })
})
