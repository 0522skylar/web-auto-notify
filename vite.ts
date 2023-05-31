// import { readFileSync } from 'fs'
// import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import type { Options } from './core'
import {
  DIRECTORY_NAME,
  // INJECT_SCRIPT_FILE_NAME,
  // INJECT_STYLE_FILE_NAME,
  JSON_FILE_NAME,
  // NOTIFICATION_ANCHOR_CLASS_NAME,
  generateJSONFileContent,
  // generateJsFileContent,
  // getFileHash,
  getVersion,
  // get__Dirname,
} from './core'

/**
 * It injects the hash into the HTML, and injects the notification anchor and the stylesheet and the
 * script into the HTML
 * @param {string} html - The original HTML of the page
 * @param {string} version - The hash of the current commit
 * @param {Options} options - Options
 * @returns The html of the page with the injected script and css.
 */
/*
function injectPluginHtml(
  html: string,
  version: string,
  options: Options,
  { cssFileHash, jsFileHash }: { jsFileHash: string; cssFileHash: string },
) {
  const { customNotificationHTML, hiddenDefaultNotification, injectFileBase = '' } = options

  const versionScript = `<script>window.pluginWebUpdateNotice_version = '${version}';</script>`
  const cssLinkHtml = customNotificationHTML || hiddenDefaultNotification ? '' : `<link rel="stylesheet" href="${injectFileBase}${DIRECTORY_NAME}/${INJECT_STYLE_FILE_NAME}.${cssFileHash}.css">`
  let res = html

  res = res.replace(
    '<head>',
    `<head>
    ${cssLinkHtml}
    <script src="${injectFileBase}${DIRECTORY_NAME}/${INJECT_SCRIPT_FILE_NAME}.${jsFileHash}.js"></script>
    ${versionScript}`,
  )

  if (!hiddenDefaultNotification) {
    res = res.replace(
      '</body>',
      `<div class="${NOTIFICATION_ANCHOR_CLASS_NAME}"></div></body>`,
    )
  }

  return res
}*/

export function webUpdateNotice(options: Options = {}): Plugin {
  let viteConfig: ResolvedConfig

  const { versionType, customVersion, silence } = options
  let version = ''
  if (versionType === 'custom')
    version = getVersion(versionType, customVersion!)
  else
    version = getVersion(versionType!)

  // /** inject script file hash */
  // let jsFileHash = ''
  // /** inject css file hash */
  // let cssFileHash = ''

  // const cssFileSource = readFileSync(`${resolve(get__Dirname(), INJECT_STYLE_FILE_NAME)}.css`, 'utf8').toString()
  // cssFileHash = getFileHash(cssFileSource)

  // let jsFileSource = ''

  return {
    name: 'vue-vite-web-update-notice',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig: ResolvedConfig) {
      // 存储最终解析的配置
      viteConfig = resolvedConfig
      if (options.injectFileBase === undefined)
        options.injectFileBase = viteConfig.base

      // jsFileSource = generateJsFileContent(
      //   readFileSync(`${resolve(get__Dirname(), INJECT_SCRIPT_FILE_NAME)}.js`, 'utf8').toString(),
      //   version,
      //   options,
      // )
      // jsFileHash = getFileHash(jsFileSource)
    },
    generateBundle(_, bundle = {}) {
      if (!version)
        return
      // inject version json file
      bundle[JSON_FILE_NAME] = {
        // @ts-expect-error: for Vite 3 support, Vite 4 has removed `isAsset` property
        isAsset: true,
        type: 'asset',
        name: undefined,
        source: generateJSONFileContent(version, silence),
        fileName: `${DIRECTORY_NAME}/${JSON_FILE_NAME}.json`,
      }

      // inject css file
      // bundle[INJECT_STYLE_FILE_NAME] = {
      //   // @ts-expect-error: for Vite 3 support, Vite 4 has removed `isAsset` property
      //   isAsset: true,
      //   type: 'asset',
      //   name: undefined,
      //   source: cssFileSource,
      //   fileName: `${DIRECTORY_NAME}/${INJECT_STYLE_FILE_NAME}.${cssFileHash}.css`,
      // }

      // inject js file
      // bundle[INJECT_SCRIPT_FILE_NAME] = {
      //   // @ts-expect-error: for Vite 3 support, Vite 4 has removed `isAsset` property
      //   isAsset: true,
      //   type: 'asset',
      //   name: undefined,
      //   source: jsFileSource,
      //   fileName: `${DIRECTORY_NAME}/${INJECT_SCRIPT_FILE_NAME}.${jsFileHash}.js`,
      // }
    },
    // transformIndexHtml: {
    //   order: 'post',
    //   handler(html: string, { chunk }) {
    //     if (version && chunk)
    //       return injectPluginHtml(html, version, options, { jsFileHash, cssFileHash })
    //     return html
    //   },
    // },
  }
}
