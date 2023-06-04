
import type { Plugin, ResolvedConfig } from 'vite'
import type { Options } from '../../core/src/index'
import {
  DIRECTORY_NAME,
  JSON_FILE_NAME,
  generateJSONFileContent,
  getVersion,
} from '../../core/src/index'

export function webUpdateNotice(options: Options = {}): Plugin {
  let viteConfig: ResolvedConfig

  const { versionType, customVersion, silence } = options
  let version = ''
  if (versionType === 'custom') {
    version = getVersion(versionType, customVersion!)
  }
  else {
    version = getVersion(versionType!)
  }
    

  return {
    name: 'vue-vite-web-auto-notify',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig: ResolvedConfig) {
      // 存储最终解析的配置
      viteConfig = resolvedConfig
      if (options.injectFileBase === undefined) {
        options.injectFileBase = viteConfig.base
      }
    },
    generateBundle(_, bundle = {}) {
      if (!version) {
        return
      }
      // inject version json file
      bundle[JSON_FILE_NAME] = {
        // @ts-expect-error: for Vite 3 support, Vite 4 has removed `isAsset` property
        isAsset: true,
        type: 'asset',
        name: undefined,
        source: generateJSONFileContent(version, silence),
        fileName: `${DIRECTORY_NAME}/${JSON_FILE_NAME}.json`,
      }

    },
   
  }
}
