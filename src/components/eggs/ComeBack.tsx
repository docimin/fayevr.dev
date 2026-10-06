import { useEffect, useState } from 'react'

const AWAY_TITLE = 'come back :('

export default function ComeBack() {
  const [returned, setReturned] = useState(false)

  useEffect(() => {
    let title = document.title
    let timer: ReturnType<typeof setTimeout> | undefined

    const onVisibilityChange = () => {
      if (document.hidden) {
        title = document.title
        document.title = AWAY_TITLE
        return
      }
      document.title = title
      setReturned(true)
      clearTimeout(timer)
      timer = setTimeout(() => setReturned(false), 4000)
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearTimeout(timer)
    }
  }, [])

  if (!returned) return null

  return (
    <div
      role="status"
      className="fixed right-4 bottom-24 z-50 rounded-sm border-2 border-black bg-background px-4 py-2 font-display text-lg text-foreground shadow-button shadow-black md:bottom-4 dark:border-white dark:shadow-white"
    >
      you came back :D
    </div>
  )
}
