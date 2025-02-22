import Header from '@/components/pages/mainHeader'
import Sideleft from '@/components/pages/side-left'
import Sideright from '@/components/pages/side-right'
import BoopCounter from '@/components/boopCounter'

export const runtime = 'edge'

export default async function Home() {
  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <Sideleft />
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 border-b dark:border-white border-black"
            style={{ position: 'relative' }}
          >
            <Header />
          </div>
          <div className="flex flex-col w-full items-center pt-10 text-black dark:text-white mb-8">
            <h1>HELLO ヽ(✿ﾟ▽ﾟ)ノ</h1>
          </div>
          <BoopCounter />
        </div>
        <Sideright />
      </main>
    </div>
  )
}
