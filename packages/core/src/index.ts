export type { Options } from './type'
import { VersionJSON, VersionType } from './type'
import { execSync } from 'node:child_process'
import { findUpSync } from 'find-up'


export { DIRECTORY_NAME, JSON_FILE_NAME } from'./constans'


export function generateJSONFileContent(version: string, silence = false) {
  const content: VersionJSON = {
    version,
  }
  if (silence) {
    content.silence = true
  }
  return JSON.stringify(content, null, 2)
}


export function getHostProjectPkgVersion() {
  try {
    return process.env.npm_package_version as string
  }
  catch (err) {
    console.warn(`[plugin-web-auto-notify] cannot get the version of the host project's package.json file!`)
    throw err
  }
}


/**
 * If the current directory is a git repository, return the current commit hash
 * @returns The git commit hash of the current branch.
 */
export function getGitCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().replace('\n', '').trim()
  }
  catch (err) {
    console.warn(`[plugin-web-auto-notify] Not a git repository!`)
    throw err
  }
}

/**
 * It returns the current timestamp
 * @returns The current time in milliseconds.
 */
export function getTimestamp() {
  return `${Date.now()}`
}

export function getCustomVersion(version?: string) {
  if (!version) {
    console.warn(`[plugin-web-auto-notify] The versionType is 'custom', but the customVersion is not specified!`)
    throw new Error('The versionType is \'custom\', but the customVersion is not specified!')
  }
  return version
}
/**
 * It checks if the current directory is a Git or SVN repository, and returns the type of repository
 * @returns 'Git' | 'SVN' | 'unknown'
 */
function checkRepoType() {
  const gitRepo = findUpSync('.git', { type: 'directory' })
  if (gitRepo) {
    return 'Git'
  }
  const svnRepo = findUpSync('.svn', { type: 'directory' })
  if (svnRepo) {
    return 'SVN'
  }
  return 'unknown'
}

/**
 * It returns the version of the current project.
 * @param {VersionType} [versionType=git_commit_hash] - The version type
 * @param {string} [customVersion] - The custom version
 * @returns The version by the plugin.
 */
export function getVersion(): string
export function getVersion(versionType: 'custom', customVersion: string): string
export function getVersion(versionType: Exclude<VersionType, 'custom'>): string
export function getVersion(versionType?: VersionType, customVersion?: string) {
  const getVersionStrategies: Record<VersionType, () => string> = {
    pkg_version: getHostProjectPkgVersion,
    git_commit_hash: getGitCommitHash,
    build_timestamp: getTimestamp,
    custom: () => getCustomVersion(customVersion),
    svn_revision_number: function (): string {
      throw new Error('Function not implemented.')
    }
  }

  const defaultStrategyMap = {
    Git: 'git_commit_hash',
    SVN: 'svn_revision_number',
    unknown: '',
  }

  const versionType_ = (versionType || defaultStrategyMap[checkRepoType()]) as VersionType

  try {
    const strategy = getVersionStrategies[versionType_]
    if (!strategy) {
      console.warn(`[plugin-web-auto-notify] The version type '${versionType}' is not supported!, we will use the packaging timestamp instead.`)
      return getTimestamp()
    }

    return strategy()
  }
  catch (err) {
    console.warn(`[plugin-web-auto-notify] get version throw a error, we will use the packaging timestamp instead.`)
    console.error(err)
    return getTimestamp()
  }
}
