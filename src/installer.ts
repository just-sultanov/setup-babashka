import * as path from 'path'

import {Params} from './protocols'
import * as utils from './utils'

export const setup = async (params: Params): Promise<void> => {
  const {installDir, toolName, version} = params

  const archiveUrl = utils.getArtifactUrl(params)

  const archiveDir = await utils.download(archiveUrl)

  const extractedDir = await utils.extract(
    archiveDir,
    path.join(installDir, toolName)
  )

  await utils.cache(extractedDir, toolName, version)

  utils.addPath(extractedDir)
}
