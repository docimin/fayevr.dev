import { useEffect, useState } from 'react'

// The rails take ~204px, so the game only gets viewport minus that. Below this
// the playfield is too narrow to read the HUD or aim comfortably.
export const DOOM_MIN_WIDTH = 1280

export default function DoomTooSmall() {
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    const read = () => setWidth(window.innerWidth)
    read()
    window.addEventListener('resize', read, { passive: true })
    return () => window.removeEventListener('resize', read)
  }, [])

  const missing = width === null ? null : Math.max(DOOM_MIN_WIDTH - width, 0)

  return (
    <div className="w-full px-4 py-10">
      <div className="doom-crt relative mx-auto max-w-md overflow-hidden rounded-lg border-2 border-black bg-black p-6 text-center dark:border-white">
        <div className="doom-scanlines pointer-events-none absolute inset-0" />

        <p className="doom-flicker font-display text-3xl font-bold text-primary">
          DOOM
        </p>

        <p className="mt-4 font-display text-lg text-white">
          <span className="doom-type">SCREEN TOO SMALL</span>
        </p>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          this one needs a keyboard and some room to breathe. come back on a
          laptop and I will let you in c:
        </p>

        <p className="mt-4 font-mono text-xs text-gray-400" aria-live="polite">
          {width === null
            ? 'measuring...'
            : `${width}px wide // need ${DOOM_MIN_WIDTH}px // ${missing}px short`}
        </p>

        <span className="doom-cursor mt-4 inline-block h-4 w-2 bg-primary align-middle" />
      </div>
    </div>
  )
}
