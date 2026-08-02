import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    // bun preset emits .output/server/index.mjs, run via `bun run`.
    // Precompress at build time: the runtime server does not compress on the
    // fly, so without this the container ships assets raw to every visitor.
    nitro({
      preset: 'bun',
      compressPublicAssets: { gzip: true, brotli: true },
    }),
    viteReact(),
  ],
})
