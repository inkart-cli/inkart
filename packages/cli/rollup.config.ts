import type { OutputOptions, RollupOptions } from 'rollup'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'

const configs: RollupOptions[] = []

function createRollupConfig() {
  const input = 'index.ts'
  const output: OutputOptions[] = [
    {
      file: 'dist/index.mjs',
      format: 'es',
    },
  ]

  configs.push({
    input,
    output,
    shimMissingExports: true,
    plugins: [
      esbuild({ target: 'esnext' }),
      json(),
    ],
  })

  return configs
}

export default createRollupConfig()
