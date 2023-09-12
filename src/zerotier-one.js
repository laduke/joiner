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
  const { allowDefault, allowManaged, allowGlobal } = network
  const service = new Service({ authToken, port })
  return service.set(network.id, { allowDefault, allowManaged, allowGlobal })
    .catch(e => {
      throw new Error(`Error joining ${network.id} ${e.message}`)
    })
}

export async function leave (config, id) {
  const { localPort: port, authToken } = config
  const service = new Service({ authToken, port })
  const result = await service.leave(id)
    .catch(e => {
      throw new Error(`Error leaving ${id} ${e.message}`)
    })
  return result
}
