import assert from 'node:assert'

import { test } from 'node:test'

import { createNetworks } from './common.js'
import { validate } from '../src/validates-local-networks.js'

test('validate local networks', async (t) => {
  await t.test('valid', () => {
    const networks = createNetworks(['1', '2'], 'source')

    assert.doesNotThrow(() => validate(networks))
  })

  await t.test('invalid throws', () => {
    const networks = [{ noid: '1234' }]

    assert.throws(() => validate(networks))
    assert.throws(() => validate({ id: '123' }))
    assert.throws(() => validate('1234'))
  })
})
