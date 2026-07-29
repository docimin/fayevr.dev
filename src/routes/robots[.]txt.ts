import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          'User-agent: *\nAllow: /\n\nSitemap: https://fayevr.dev/sitemap.xml\n',
          { headers: { 'Content-Type': 'text/plain' } }
        ),
    },
  },
})
