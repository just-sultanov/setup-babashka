import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

import * as path from 'path'
import * as os from 'os'

import {Params} from './protocols'

export const getInstallDir = (): string => {
  return path.join(os.homedir(), 'bin')
}

export const getArtifactName = (platform: string, version: string): string => {
  switch (platform) {
    case 'win32':
      return `babashka-${version}-windows-amd64.zip`
    case 'darwin':
      return `babashka-${version}-macos-amd64.tar.gz`
    default:
      return `babashka-${version}-linux-amd64-static.tar.gz`
  }
}

export const getArtifactUrl = ({platform, version}: Params): string => {
  const archiveName = getArtifactName(platform, version)
  return `https://github.com/babashka/babashka/releases/download/v${version}/${archiveName}`
}

export const error = (msg: string, err: Error): never => {
  core.setFailed(msg)
  core.error(err)
  process.exit(1)
}

export const download = async (url: string): Promise<string> => {
  core.info(`Downloading file from ${url}`)
  return await tc
    .downloadTool(url)
    // eslint-disable-next-line github/no-then
    .catch(err => error('Failed to download file', err))
}

export const extract = async (
  source: string,
  destination: string
): Promise<string> => {
  core.info(`Extracting ${source} into ${destination}`)
  if (destination.endsWith('.zip')) {
    return await tc
      .extractZip(source, destination)
      // eslint-disable-next-line github/no-then
      .catch(err => error('Failed to extract file', err))
  }
  return await tc
    .extractTar(source, destination)
    // eslint-disable-next-line github/no-then
    .catch(err => error('Failed to extract file', err))
}

export const attemptToInstallFromCache = (
  toolName: string,
  version: string
): void => {
  core.info(`Search ${toolName} ${version} in the cache`)
  const cachePath = tc.find(toolName, version)
  if (cachePath !== '') {
    core.info(`${toolName} ${version} is found in the cache`)
    addPath(cachePath)
    exit(0)
  }
}

export const cache = async (
  source: string,
  toolName: string,
  version: string
): Promise<string> => {
  core.info(`Caching ${source} directory`)
  return await tc
    .cacheDir(source, toolName, version)
    // eslint-disable-next-line github/no-then
    .catch(err => error(`Failed to cache ${source} directory`, err))
}

export const addPath = (source: string): string => {
  core.info(`Add ${source} to PATH`)
  core.addPath(source)
  return source
}

export const exit = (code: number): void => {
  process.exit(code)
}
