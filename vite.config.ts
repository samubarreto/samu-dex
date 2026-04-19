import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

function spaFallbackPlugin(): Plugin {
  const base = '/samu-dex/'
  let outDir: string

  return {
    name: 'spa-fallback',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && !req.url.startsWith(base)) {
          res.writeHead(302, { Location: base + req.url!.slice(1) })
          res.end()
          return
        }
        next()
      })
    },
    closeBundle() {
      try {
        copyFileSync(
          resolve(outDir, 'index.html'),
          resolve(outDir, '404.html')
        )
      } catch { }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  build: {
    outDir: 'build'
  },
  base: '/samu-dex/'
})

