export function createNetworks (ids) {
  return ids.map((id) => createNetwork(id))
}

function createNetwork (id) {
  return { id }
}
