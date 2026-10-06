import { Link, useLocation } from '@tanstack/react-router'
import CrtPanel from '@/components/CrtPanel'

export default function NotFound() {
  const pathname = useLocation({ select: (location) => location.pathname })

  return (
    <main className="flex min-h-screen w-full items-center px-4 py-10">
      <CrtPanel>
        <h1 className="doom-flicker text-3xl font-bold text-primary">
          SEGFAULT
        </h1>

        <p className="mt-4 font-display text-lg text-white">
          <span className="doom-type">CORE DUMPED (404)</span>
        </p>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          you poked at memory that was never allocated. nothing lives here.
        </p>

        <p className="mt-4 break-words font-mono text-xs text-gray-400">
          {`read ${pathname} // 0x194 // no such page`}
        </p>

        <Link
          to="/"
          className="relative mt-6 inline-block rounded-sm border-2 border-white px-3.5 py-2.5 text-white hover:border-primary hover:text-primary"
        >
          cd ~
        </Link>

        <span className="doom-cursor ml-4 inline-block h-4 w-2 bg-primary align-middle" />
      </CrtPanel>
    </main>
  )
}
