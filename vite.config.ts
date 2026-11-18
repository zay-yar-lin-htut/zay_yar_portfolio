import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import contactHandler from './api/contact'

function contactApiPlugin() {
  const mountMiddleware = (middlewares: { use: (path: string, fn: (req: any, res: any, next: () => void) => void) => void }) => {
    middlewares.use('/api/contact', async (req, res, next) => {
      if (req.url && req.url !== '/' && !req.url.startsWith('/?')) {
        return next()
      }
      const chunks: Buffer[] = []
      req.on('data', (chunk: Buffer) => chunks.push(chunk))
      req.on('end', async () => {
        let body: Record<string, unknown> = {}
        try {
          const raw = Buffer.concat(chunks).toString('utf-8')
          if (raw) body = JSON.parse(raw)
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid JSON body' }))
          return
        }

        let statusCode = 200
        const apiRes = {
          status(code: number) {
            statusCode = code
            return apiRes
          },
          json(payload: { error?: string; success?: boolean }) {
            res.statusCode = statusCode
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
          }
        }

        await contactHandler(
          { method: req.method, body, headers: req.headers },
          apiRes
        )
      })
    })
  }

  return {
    name: 'contact-api-middleware',
    configureServer(server: { middlewares: any }) {
      mountMiddleware(server.middlewares)
    },
    configurePreviewServer(server: { middlewares: any }) {
      mountMiddleware(server.middlewares)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    contactApiPlugin(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
