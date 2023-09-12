import path from 'path'
import os from 'os'

export function guess () {
  const tokenPaths = {
    darwin: path.join(
      os.homedir(),
      'Library',
      'Application Support',
      'ZeroTier',
      'One',
      'authtoken.secret'
    ),
    win32: path.join('ProgramData', 'ZeroTier One', 'authtoken.secret')
  }

  const nix = path.join('var', 'lib', 'zerotier-one', 'authtoken.secret')

  return tokenPaths[os.platform()] || nix
}
