import Ajv from 'ajv/dist/jtd.js'

const schema = {
  properties: {
    id: { type: 'string' }
  },

  optionalProperties: {
    name: { type: 'string' },
    allowDNS: { type: 'boolean' },
    allowManaged: { type: 'boolean' },
    allowDefault: { type: 'boolean' },
    allowGlobal: { type: 'boolean' }
  },
  additionalProperties: true
}
const ajv = new Ajv()
const _validate = ajv.compile(schema)

export function validate (networks) {
  for (const nw of networks) {
    const valid = _validate(nw)
    if (!valid) {
      throw _validate.errors[0]
    }
  }
  return networks
}
