import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './index.ts',
  clean: true,
  dts: true,
  target: 'esnext',
})
