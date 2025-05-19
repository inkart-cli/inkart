import type { OutputOptions, RollupOptions } from 'rollup'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'

const configs: RollupOptions[] = []

function esbuildMinifier(options: ESBuildOptions) {
  const { renderChunk } = esbuild(options)
  return {
    name: 'esbuild-minifier',
    renderChunk,
  }
}

function createRollupConfig() {
  const input = 'index.ts'
  const output: OutputOptions[] = [
    {
      file: 'index.mjs',
      format: 'es',
    },
    {
      file: 'index.iife.js',
      format: 'iife',
      name: 'CLI',
      extend: true,
      globals: {},
      plugins: [],
    },
    {
      file: 'index.iife.min.js',
      format: 'iife',
      name: 'CLI',
      extend: true,
      globals: {},
      plugins: [
        esbuildMinifier({ minify: true }),
      ],
    },
  ]

  configs.push({
    input,
    output,
    plugins: [
      esbuild({ target: 'es2018' }),
      json(),
    ],
    external: [
      /@inkart\/.*/,
    ],
  })

  return configs
}

export default createRollupConfig()
