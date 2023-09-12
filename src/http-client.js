import { nanorequest } from 'nanorequest'

export async function getNetworks (url) {
  const opts = { url }
  return nanorequest(opts)
    .then((x) => {
      if (!(x.res.statusCode >= 400)) {
        return { ...x.body, source: url }
      }

      return Promise.reject(
        new Error('Unsuccessful response ' + x.res.statusCode)
      )
    })
    .catch((err) => {
      return { error: true, message: err.message, url }
    })
}
