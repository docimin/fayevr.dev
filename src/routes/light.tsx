import { createFileRoute, Link } from '@tanstack/react-router'
import { type PointerEvent, useRef } from 'react'
import LightBulb from '@/components/LightBulb'

export const Route = createFileRoute('/light')({
  head: () => ({ meta: [{ title: 'Light | Faye' }] }),
  component: Light,
})

function Light() {
  const beamRef = useRef<HTMLDivElement>(null)

  // Written straight to the element: a state update per pointer event would
  // re-render the video subtree on every mouse move.
  const aimBeam = (event: PointerEvent<HTMLDivElement>) => {
    const beam = beamRef.current
    if (!beam) return
    const rect = beam.getBoundingClientRect()
    beam.style.setProperty('--x', `${event.clientX - rect.left}px`)
    beam.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <div>
      <main className="flex relative w-full h-full">
        <div className="flex flex-col w-full items-center">
          <div style={{ position: 'relative' }} onPointerMove={aimBeam}>
            <LightBulb />
            <div
              ref={beamRef}
              aria-hidden="true"
              className="flashlight pointer-events-none absolute inset-0 hidden dark:block"
            >
              <div className="flashlight-wall absolute inset-0 flex flex-col items-end justify-end gap-2 p-10 font-display text-white">
                <p className="text-2xl">you brought a flashlight c:</p>
                <p className="text-base">psst: curl fayevr.dev</p>
              </div>
            </div>
            <Link to="/">
              <button
                type="button"
                className="px-3.5 py-2.5 border-2 mr-4 border-black dark:border-white rounded-sm shadow-button shadow-black dark:shadow-white text-black dark:text-white"
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                  transition: 'box-shadow 0.2s ease-in-out',
                }}
              >
                Go home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
