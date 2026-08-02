import { Volume2, VolumeX } from 'lucide-react'
import { useClickSound } from './useClickSound'

export default function SoundToggle() {
  const { enabled, setEnabled } = useClickSound()

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      aria-pressed={enabled}
      aria-label={enabled ? 'Click sound on' : 'Click sound off'}
      className="flex h-11 w-11 items-center justify-center text-black dark:text-white"
    >
      {enabled ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5 opacity-50" />
      )}
    </button>
  )
}
