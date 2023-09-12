import { test } from 'node:test'
import assert from 'node:assert'

import { createNetworks } from './common.js'
import { dedupe, diff } from '../src/diffs-resources.js'

test('merge and diff networks', async (t) => {
  await t.test('dedupe remote networks', () => {
    const n1 = createNetworks([1, 2, 3])
    const n2 = createNetworks([2, 3, 4])

    const result = dedupe([n1, n2])

    assert.deepEqual(createNetworks([1, 2, 3, 4]), result)
  })

  await t.test('diff local and remote networks', () => {
    const n1 = createNetworks([1, 2, 3])
    const n2 = createNetworks([2, 3, 5, 4])

    const { added, removed } = diff(n1, n2)

    assert.deepEqual(createNetworks([4, 5]), added)
    assert.deepEqual(createNetworks([1]), removed)
  })
})
