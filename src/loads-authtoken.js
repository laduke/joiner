import { guess as guessAuthToken } from './guess-authtoken.js'
import { read } from './read-file.js'

export async function load (tokenPath) {
  tokenPath = tokenPath || guessAuthToken()

  const contents = await read(tokenPath)

  return contents
}
