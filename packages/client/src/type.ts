export interface Options {
  /**
   * support 'git_commit_hash' | 'svn_revision_number' | 'pkg_version' | 'build_timestamp' | 'custom'
   * * if repository type is 'Git', default is 'git_commit_hash'
   * * if repository type is 'SVN', default is 'svn_revision_number'
   * * if repository type is 'unknown', default is 'build_timestamp'
   * */
  versionType?: VersionType

  customVersion?: string
  /** polling interval(ms).
   * if set to 0, it will not polling
   * @default 10 * 60 * 1000
   */
  checkInterval?: number

  checkOnWindowFocus?: boolean

  checkImmediately?: boolean

  checkOnLoadFileError?: boolean
  logVersion?: boolean | ((version: string) => void)
  silence?: boolean
  customNotificationHTML?: string
  notificationProps?: NotificationProps
  notificationConfig?: NotificationConfig
  locale?: string
  localeData?: LocaleData
  hiddenDefaultNotification?: boolean
  hiddenDismissButton?: boolean
  injectFileBase?: string
}

export type VersionType = 'git_commit_hash' | 'svn_revision_number' | 'pkg_version' | 'build_timestamp' | 'custom'

export interface NotificationConfig {
  primaryColor?: string
  secondaryColor?: string
  /** @default 'topRight' */
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

export interface NotificationProps {
  title?: string
  description?: string
  buttonText?: string
  dismissButtonText?: string
}

export type LocaleData = Record<string, NotificationProps>

export interface VersionJSON {
  version: string
  silence?: boolean
}
