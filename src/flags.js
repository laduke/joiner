import minimist from 'minimist'

export function flags () {
  return minimist(process.argv.slice(2))
}
