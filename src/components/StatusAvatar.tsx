import * as React from 'react'

// Named PRESENCE_CLASS, not STATUS_CLASS - src/data/projects.ts exports a
// STATUS_CLASS for project rows, which is a different thing.
const PRESENCE_CLASS: Record<string, string> = {
  online: 'bg-green',
  idle: 'bg-yellow',
  dnd: 'bg-red',
  offline: 'bg-gray',
}

function StatusAvatar({ size = 75 }: { size?: number }) {
  const [status, setStatus] = React.useState('offline')
  const [showText, setShowText] = React.useState(false)

  React.useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch(`/api/getStatus`)
        const data = await response.json()
        const status = data.status
        setStatus(status)
      } catch (error) {
        console.error(error)
      }
    }

    let timer: ReturnType<typeof setInterval> | undefined

    const start = () => {
      if (timer) return
      fetchStatus()
      timer = setInterval(fetchStatus, 30000)
    }
    const stop = () => {
      clearInterval(timer)
      timer = undefined
    }
    const onVisibility = () =>
      document.visibilityState === 'visible' ? start() : stop()

    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const presenceClass = PRESENCE_CLASS[status] ?? PRESENCE_CLASS.offline
  const dotClass = size <= 40 ? 'h-2 w-2' : 'h-3 w-3'

  const handleClick = () => {
    setShowText(true)
    setTimeout(() => {
      setShowText(false)
    }, 1000)
  }

  return (
    <button
      type="button"
      aria-label="Boop"
      className="relative flex min-h-11 min-w-11 justify-center items-center"
      onClick={handleClick}
    >
      <img
        className="rounded-md object-cover"
        style={{ width: size, height: size }}
        src="/icon-256.png"
        alt="Faye's Icon"
        width={size}
        height={size}
      />
      {showText && (
        <p className="absolute w-[100px] translate-x-[-100%] translate-y-[-10%]">
          boop :3
        </p>
      )}
      <span className="absolute left-2 bottom-2">
        <span className={`relative flex ${dotClass}`}>
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${presenceClass} opacity-75`}
          />
          <span
            className={`relative inline-flex rounded-full ${dotClass} ${presenceClass}`}
          />
        </span>
      </span>
    </button>
  )
}

export default StatusAvatar
