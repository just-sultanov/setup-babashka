import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

import * as ubuntu from './installers/ubuntu'

const version = core.getInput('version', {required: true})

const cachePath = tc.find('babashka', version)

if (cachePath !== '') {
  core.addPath(cachePath)
  process.exit(0)
}

const params = {version}

switch (process.platform) {
  case 'win32':
    core.warning(
      'Unfortunately, the Windows platform is not currently supported'
    )
    break
  case 'darwin':
    core.warning('Unfortunately, the macOS platform is not currently supported')
    break
  default:
    ubuntu.setup(params)
}
