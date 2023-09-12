import http from 'node:http'

import * as td from 'testdouble'

import { test, beforeEach, afterEach } from 'node:test'

import App from '../src/index.js'

const remoteNetworks = {
  networks: [{ id: '1111111111111111' }, { id: '3333333333333333' }]
}

const localNetworks = [
  { id: '2222222222222222', allowDNS: true, allowManaged: true }
]

const remoteServer = () =>
  http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(remoteNetworks))
  })

const localServer = (spy) =>
  http.createServer((req, res) => {
    spy(req.method, req.url)
    if (req.method === 'GET' && req.url === '/network') {
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify(localNetworks))
    } else if (req.method === 'POST' && req.url.includes('/network')) {
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify(localNetworks))
    } else {
      res.setHeader('content-type', 'application/json')
      res.end('[]')
    }
  })

test('integration', async (t) => {
  let fakeRemote, remotePort
  let fakeLocal, localPort
  let spyLocal

  beforeEach((_, done) => {
    spyLocal = td.func()
    fakeRemote = remoteServer().listen({ host: '127.0.0.1', port: 0 }, (e) => {
      if (e) {
        throw e
      }

      fakeLocal = localServer(spyLocal).listen(
        { host: '127.0.0.1', port: 0 },
        (e) => {
          if (e) {
            throw e
          }

          remotePort = fakeRemote.address().port
          localPort = fakeLocal.address().port

          done()
        }
      )
    })
  })

  afterEach(async () => {
    await fakeRemote.close()
    await fakeLocal.close()
  })

  await t.test('get remote, update local', async () => {
    const urls = [
      `http://127.0.0.1:${remotePort}/a`,
      `http://127.0.0.1:${remotePort}/b`
    ]
    const tokenPath = process.cwd() + '/test/authtoken.secret'

    const app = App()

    await app.run({ urls, tokenPath, localPort })

    td.verify(spyLocal('POST', '/network/1111111111111111'), { times: 1 })
    td.verify(spyLocal('POST', '/network/3333333333333333'), { times: 1 })
    td.verify(spyLocal('DELETE', '/network/2222222222222222'), { times: 1 })
  })
})
