// https://crxjs.dev/vite-plugin/getting-started/solid/create-project
import path from 'path'
import { glob } from 'glob'
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import solidPlugin from 'vite-plugin-solid'
import manifest from './src/manifest.json'

export default defineConfig({
  plugins: [
    solidPlugin(),
    crx({ manifest })
  ],
  // https://github.com/crxjs/chrome-extension-tools/issues/648
  server: {
    port: 3000,
    hmr: { port: 3000 }
  },
  // https://stackoverflow.com/a/66877705
  root: path.join(__dirname, './src'),
  build: { 
    outDir: path.join(__dirname, './dist'),
    emptyOutDir: true
  }
})
