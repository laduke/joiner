import assert from 'node:assert'

import * as td from 'testdouble'

import { test, beforeEach, afterEach } from 'node:test'

test('auth token', async (t) => {
  let subject, readFile, guessesToken

  beforeEach(async () => {
    readFile = await td.replaceEsm('../src/read-file.js')
    guessesToken = await td.replaceEsm('../src/guess-authtoken.js')

    subject = await import('../src/loads-authtoken.js')
  })

  afterEach(() => {
    td.reset()
  })

  await t.test('loads authtoken from path', async () => {
    td.when(readFile.read('/abc')).thenResolve('def')

    const x = await subject.load('/abc')

    assert.equal('def', x)
  })
  await t.test('guesses authtoken', async () => {
    td.when(readFile.read('/def')).thenResolve('123')
    td.when(guessesToken.guess()).thenReturn('/def')

    const x = await subject.load()

    assert.equal('123', x)
  })
})
