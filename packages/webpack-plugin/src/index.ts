import type { Options } from '../../core/src/index'
import {
  DIRECTORY_NAME,
  JSON_FILE_NAME,
  generateJSONFileContent,
  getVersion,
} from '../../core/src/index'
import type { Compilation, Compiler } from 'webpack'

const pluginName = 'WebAutoNotifyPlugin'

type PluginOptions = Options & {
  indexHtmlFilePath?: string
}


class WebAutoNotifyPlugin {
  options: PluginOptions
  constructor(options: PluginOptions) {
    this.options = options || {}
  }

  apply(compiler: Compiler) {
    const { publicPath } = compiler.options.output
    if (this.options.injectFileBase === undefined)
      this.options.injectFileBase = typeof publicPath === 'string' ? publicPath : '/'

    const { versionType, customVersion, silence } = this.options
    let version = ''
    if (versionType === 'custom')
      version = getVersion(versionType, customVersion!)
    else
      version = getVersion(versionType!)

    compiler.hooks.emit.tap(pluginName, (compilation: Compilation) => {
      // const outputPath = compiler.outputPath
      const jsonFileContent = generateJSONFileContent(version, silence)
      // @ts-expect-error
      compilation.assets[`${this.options.injectFileBase}${DIRECTORY_NAME}/${JSON_FILE_NAME}.json`] = {
        source: () => jsonFileContent,
        size: () => jsonFileContent.length,
      }
    })
  }
}

export { WebAutoNotifyPlugin }
