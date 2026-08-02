import * as React from 'react'

const STORAGE_KEY = 'click-sound'

function readEnabled(): boolean {
  if (typeof localStorage === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch (e) {
    console.warn(
      'useClickSound: localStorage.getItem failed, click sound stays off',
      e
    )
    return false
  }
}

export function useClickSound() {
  const [enabled, setEnabledState] = React.useState(readEnabled)

  React.useEffect(() => {
    if (!enabled) return

    const audio = new Audio('/sounds/click.ogg')
    audio.volume = 0.2

    const play = () => {
      audio.currentTime = 0
      audio.play().catch((e) => {
        console.warn(
          'useClickSound: audio.play() was blocked, sound will not play until the user interacts',
          e
        )
      })
    }

    document.addEventListener('pointerdown', play)
    return () => document.removeEventListener('pointerdown', play)
  }, [enabled])

  const setEnabled = React.useCallback((value: boolean) => {
    setEnabledState(value)
    try {
      localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off')
    } catch (e) {
      console.warn(
        'useClickSound: localStorage.setItem failed, sound choice will not persist',
        e
      )
    }
  }, [])

  return { enabled, setEnabled }
}
