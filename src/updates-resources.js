import { leave, join } from '../src/zerotier-one.js'

export async function update (config, { added, removed }) {
  const leaving = removed.map(({ id }) => leave(config, id))
  const left = await Promise.all(leaving)

  const joining = added.map((nw) => join(config, nw))
  const joined = await Promise.all(joining)

  return { joined, left }
}
