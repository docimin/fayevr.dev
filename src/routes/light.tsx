import { createFileRoute, Link } from '@tanstack/react-router'
import LightBulb from '@/components/LightBulb'

export const Route = createFileRoute('/light')({
  head: () => ({ meta: [{ title: 'Light | Faye' }] }),
  component: Light,
})

function Light() {
  return (
    <div>
      <main className="flex relative w-full h-full">
        <div className="flex flex-col w-full items-center">
          <div style={{ position: 'relative' }}>
            <LightBulb />
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
