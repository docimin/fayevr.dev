import { createFileRoute, Link } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import CrtPanel from '@/components/CrtPanel'

const teapot = createMiddleware().server(async ({ next }) => {
  const result = await next()
  return new Response(result.response.body, {
    status: 418,
    headers: result.response.headers,
  })
})

export const Route = createFileRoute('/coffee')({
  head: () => ({ meta: [{ title: "418 I'm a teapot | Faye" }] }),
  server: { middleware: [teapot] },
  component: Coffee,
})

const TEAPOT = `         ;,'
 _o_    ;:;'
,-.'---\`.__ ;
((j\`=====',-'
 \`-\\     /
    \`-=-'`

function Coffee() {
  return (
    <main className="flex min-h-screen w-full items-center px-4 py-10">
      <CrtPanel>
        <h1 className="doom-flicker text-3xl font-bold text-primary">418</h1>

        <p className="mt-4 font-display text-lg text-white">
          <span className="doom-type">I&#39;M A TEAPOT</span>
        </p>

        <pre
          aria-hidden="true"
          className="mt-4 inline-block text-left font-mono text-xs leading-4 tracking-normal text-primary"
        >
          {TEAPOT}
        </pre>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          you asked a teapot to brew coffee. it is short, it is stout, and it
          refuses.
        </p>

        <p className="mt-4 font-mono text-xs text-gray-400">
          {'BREW /coffee // RFC 2324 // try tea'}
        </p>

        <Link
          to="/"
          className="relative mt-6 inline-block rounded-sm border-2 border-white px-3.5 py-2.5 text-white hover:border-primary hover:text-primary"
        >
          go home
        </Link>
      </CrtPanel>
    </main>
  )
}
