import Header from '@/components/pages/mainHeader'
import Sideleft from '@/components/pages/side-left'
import Sideright from '@/components/pages/side-right'

export default function Doom() {
  return (
    <main className="flex relative w-full h-full overflow-hidden">
      <Sideleft />
      <div className="flex flex-col w-full items-center min-h-[100px]">
        <div
          className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black"
          style={{ position: 'relative' }}
        >
          <Header />
        </div>
        <div className="flex flex-col w-full items-center pt-10">
          <iframe
            src="https://emupedia.net/emupedia-game-doom1/"
            title="EmuOS"
            className="w-full h-full"
            style={{ height: '1000px' }}
          ></iframe>
        </div>
        <h1 className="dark:text-white">Press enter or escape to play c:</h1>
        <ul className="dark:text-white">
          <li>CTRL to shoot</li>
          <li>Shift to run</li>
          <li>Space to open doors</li>
          <li>Arrow keys to move</li>
        </ul>
      </div>
      <Sideright />
    </main>
  )
}
