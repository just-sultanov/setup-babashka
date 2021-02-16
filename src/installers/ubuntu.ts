import * as path from 'path'
import * as os from 'os'

import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

interface Params {
  version: string
}

const error = (msg: string, err: Error): never => {
  core.setFailed(msg)
  core.error(err)
  process.exit(1)
}

export const setup = async ({version}: Params): Promise<void> => {
  const installDir = path.join(os.homedir(), 'bin')
  const toolName = 'babashka'

  const archiveName = `babashka-${version}-linux-static-amd64.zip`
  const archiveUrl = `https://github.com/babashka/babashka/releases/download/v${version}/${archiveName}`

  core.info(`Downloading file from ${archiveUrl}`)
  const archiveDir = await tc
    .downloadTool(archiveUrl)
    // eslint-disable-next-line github/no-then
    .catch(err => error('Failed to download file', err))

  core.info(`Extracting ${archiveDir} into ${installDir}`)
  const extractedDir = await tc
    .extractZip(archiveDir, path.join(installDir, toolName))
    // eslint-disable-next-line github/no-then
    .catch(err => error('Failed to extract file', err))

  core.info(`Caching ${extractedDir} directory`)
  await tc
    .cacheDir(extractedDir, toolName, version)
    // eslint-disable-next-line github/no-then
    .catch(err => error(`Failed to cache ${extractedDir} directory`, err))

  core.info(`Add ${extractedDir} to PATH`)
  core.addPath(extractedDir)
}
