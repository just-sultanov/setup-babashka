import * as core from '@actions/core'

import * as installer from './installer'
import * as utils from './utils'

const platform = process.platform
const installDir = utils.getInstallDir()
const toolName = 'babashka'
const version = core.getInput('version', {required: true}) || '0.2.10'

utils.attemptToInstallFromCache(toolName, version)

const params = {platform, installDir, toolName, version}

core.info(`Setup babashka ${version}`)

installer.setup(params)
