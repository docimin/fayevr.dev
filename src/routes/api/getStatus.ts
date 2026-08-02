import { createFileRoute } from '@tanstack/react-router'

const STATUS_URL = 'https://api1.fayevr.dev/getstatus?member=196742608846979072'

export const Route = createFileRoute('/api/getStatus')({
  server: {
    handlers: {
      GET: async () => {
        const response = await fetch(STATUS_URL, {
          headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
          return Response.json(
            { message: 'Upstream status request failed' },
            { status: response.status }
          )
        }

        return Response.json(await response.json(), {
          headers: { 'Cache-Control': 'public, max-age=15' },
        })
      },
    },
  },
})
