import { createFileRoute } from '@tanstack/react-router'

const PATHS = ['', '/projects']

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map(
          (path) =>
            `<url><loc>https://fayevr.dev${path}</loc><changefreq>yearly</changefreq><priority>1.0</priority></url>`
        ).join('')

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
          { headers: { 'Content-Type': 'application/xml' } }
        )
      },
    },
  },
})
