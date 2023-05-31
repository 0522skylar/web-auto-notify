// import { resolve } from 'path'
import { defineConfig } from 'tsup'
// import { pkgName } from '@plugin-web-update-notification/core'

export default defineConfig((options) => { // The options here is derived from CLI flags.
  return {
    entry: {
      index: 'src/index.ts',
    },
    target: 'es5',
    splitting: false,
    sourcemap: false,
    format: ['esm', 'iife'],
    minify: !options.watch,
  }
})
