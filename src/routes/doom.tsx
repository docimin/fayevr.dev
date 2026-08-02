import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import DoomTooSmall, { DOOM_MIN_WIDTH } from '@/components/DoomTooSmall'
import Header from '@/components/pages/Header'
import SideLeft from '@/components/pages/SideLeft'
import SideRight from '@/components/pages/SideRight'

export const Route = createFileRoute('/doom')({
  head: () => ({ meta: [{ title: 'Doom | Faye' }] }),
  component: Doom,
})

function Doom() {
  // CSS-hiding the iframe would still download the whole emulator on phones
  // that can never play it, so it is kept out of the tree entirely.
  const [wideEnough, setWideEnough] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${DOOM_MIN_WIDTH}px)`)
    const sync = () => setWideEnough(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <SideLeft />
        <div className="flex flex-col w-full items-center min-h-rail">
          <div className="relative flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black">
            <Header />
          </div>
          {wideEnough ? (
            <div className="flex w-full flex-col items-center pt-10">
              <iframe
                src="https://emupedia.net/emupedia-game-doom1/"
                title="EmuOS"
                className="w-full"
                /* 4:3 is DOOM's native ratio; the old fixed 1000px overflowed
                   laptop viewports and forced scrolling to see the game. */
                style={{ aspectRatio: '4 / 3', maxHeight: '80vh' }}
              />
              <h1 className="dark:text-white">
                Press enter or escape to play c:
              </h1>
              <ul className="dark:text-white">
                <li>CTRL to shoot</li>
                <li>Shift to run</li>
                <li>Space to open doors</li>
                <li>Arrow keys to move</li>
              </ul>
            </div>
          ) : (
            <DoomTooSmall />
          )}
        </div>
        <SideRight />
      </main>
    </div>
  )
}
