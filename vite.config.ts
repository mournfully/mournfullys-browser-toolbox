// https://crxjs.dev/vite-plugin/getting-started/solid/create-project
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest.json'

export default defineConfig({
  plugins: [
    solidPlugin(),
    crx({ manifest }),
  ],
  // https://github.com/crxjs/chrome-extension-tools/issues/648
  server: { 
    port: 3000,
    hmr: { port: 3000 }, 
  },
})
