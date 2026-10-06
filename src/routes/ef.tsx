import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// Dates change every year: take them from eurofurence.org.
const EUROFURENCE = { edition: 31, start: '2027-08-18', end: '2027-08-22' }
const DAY_MS = 86_400_000

function efStatus(now: number): string | null {
  const days = Math.ceil((Date.parse(EUROFURENCE.start) - now) / DAY_MS)
  if (days > 0)
    return `Noch ${days} ${days === 1 ? 'Tag' : 'Tage'} bis zur Eurofurence ${EUROFURENCE.edition}!`
  if (now < Date.parse(EUROFURENCE.end) + DAY_MS)
    return `Die Eurofurence ${EUROFURENCE.edition} läuft gerade!`
  return null
}

export const Route = createFileRoute('/ef')({
  head: () => ({ meta: [{ title: 'EF | Faye' }] }),
  component: EF,
})

function EF() {
  const [showEnglish, setShowEnglish] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  // Decided after mount: the server's clock and timezone are not the visitor's.
  useEffect(() => setStatus(efStatus(Date.now())), [])

  const handleButtonClick = () => {
    setShowEnglish(true)
  }

  useEffect(() => {
    if (showEnglish) {
      const timer = setTimeout(() => {
        setShowEnglish(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showEnglish])

  return (
    <div>
      <main className="flex relative w-full h-full overflow-hidden">
        <div className="flex flex-col w-full items-center min-h-[100px]">
          <div
            className="flex flex-col w-full items-center pb-2.5 dark:border-white border-black"
            style={{ position: 'relative' }}
          ></div>
          <button
            type="button"
            className="px-3.5 py-2.5 border-2 border-black dark:border-white dark:text-white text-black rounded-sm shadow-button shadow-black dark:shadow-white"
            style={{ transition: 'box-shadow 0.2s ease-in-out' }}
            onClick={handleButtonClick}
          >
            English Version
          </button>
          {showEnglish && (
            <span
              id="english"
              className="text-red-500 pt-4 text-xl sm:text-3xl text-center"
            >
              Sprich deutsch du Hurensohn!
            </span>
          )}
          <div className="flex flex-col w-full items-center pt-10 text-black dark:text-white">
            <h1 className="rainbow text-4xl">Eurofurence Edition</h1>
            {status && <p className="pt-4 font-display text-xl">{status}</p>}
            <br />
            <span className="text-2xl p-4 text-center">
              Sie müssen schwul sein,
              <br />
              da sie von der Eurofurence stammen!
            </span>
            <span>Schau dir die headpat.de seite an:</span>
            <a
              className="text-red-600 dark:text-red-500"
              href="https://headpat.de"
              target="_blank"
              rel="noreferrer"
            >
              https://headpat.de
            </a>
            <br />
            <br />
            <span>Was machen sie eigentlich noch hier?</span>
            <span>Geben sie bitte faye einen hug!</span>
          </div>
        </div>
      </main>
    </div>
  )
}
