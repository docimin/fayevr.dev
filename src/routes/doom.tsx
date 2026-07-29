import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/pages/Header'
import SideLeft from '@/components/pages/SideLeft'
import SideRight from '@/components/pages/SideRight'

export const Route = createFileRoute('/doom')({
  head: () => ({ meta: [{ title: 'Doom | Faye' }] }),
  component: Doom,
})

function Doom() {
  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <SideLeft />
        <div className="flex flex-col w-full items-center min-h-rail">
          <div className="relative flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black">
            <Header />
          </div>
          <div className="flex flex-col w-full items-center pt-10">
            <iframe
              src="https://emupedia.net/emupedia-game-doom1/"
              title="EmuOS"
              className="w-full h-full"
              style={{ height: '1000px' }}
            />
          </div>
          <h1 className="dark:text-white">Press enter or escape to play c:</h1>
          <ul className="dark:text-white">
            <li>CTRL to shoot</li>
            <li>Shift to run</li>
            <li>Space to open doors</li>
            <li>Arrow keys to move</li>
          </ul>
        </div>
        <SideRight />
      </main>
    </div>
  )
}
