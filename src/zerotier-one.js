import Service from 'zerotier-service'

export async function getNetworks (authToken, port) {
  const service = new Service({ authToken, port })

  return service
    .networks()
    .catch((e) => {
      throw new Error(e.message + ' from zerotier-one')
    })
    .then((json) => {
      return json.body
    })
}

export async function join (config, network) {
  const { localPort: port, authToken } = config
  const { allowDefault, allowManaged, allowGlobal, allowDNS } = network
  const service = new Service({ authToken, port })
  return service.set(network.id, { allowDefault, allowManaged, allowGlobal, allowDNS })
    .then(x => x.body.id)
    .catch(e => {
      throw new Error(`Error joining ${network.id} ${e.message}`)
    })
}

export async function leave (config, id) {
  const { localPort: port, authToken } = config
  const service = new Service({ authToken, port })
  const result = await service.leave(id)
    .then(_ => id)
    .catch(e => {
      throw new Error(`Error leaving ${id} ${e.message}`)
    })
  return result
}
