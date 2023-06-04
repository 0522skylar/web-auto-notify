import { defineConfig } from 'tsup'

export default defineConfig((options) => { // The options here is derived from CLI flags.
  return {
    entry: {
      index: 'src/index.ts',
    },
    target: 'es6',
    splitting: false,
    sourcemap: false,
    format: ['esm', 'iife'],
    minify: !options.watch,
  }
})
