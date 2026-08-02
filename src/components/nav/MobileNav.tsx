import { SiDiscord, SiGithub, SiX } from '@icons-pack/react-simple-icons'
import { Link } from '@tanstack/react-router'
import { Gamepad2Icon, LightbulbIcon, SearchIcon } from 'lucide-react'
import { useCommandPalette } from '@/components/CommandPaletteProvider'
import StatusAvatar from '@/components/StatusAvatar'

const ITEM =
  'flex h-11 w-11 items-center justify-center text-black dark:text-white'
const ACTIVE_PROPS = { className: 'bg-secondary rounded-md' }

export default function MobileNav() {
  const { open, setOpen } = useCommandPalette()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-black bg-glass backdrop-blur md:hidden dark:border-white"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <button
        type="button"
        className={ITEM}
        onClick={() => setOpen(!open)}
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
      <a
        href="https://github.com/docimin"
        target="_blank"
        rel="noreferrer"
        className={ITEM}
        aria-label="GitHub"
      >
        <SiGithub className="h-5 w-5" />
      </a>
      <a
        href="https://discord.com/users/196742608846979072"
        target="_blank"
        rel="noreferrer"
        className={ITEM}
        aria-label="Discord"
      >
        <SiDiscord className="h-5 w-5" />
      </a>
      <a
        href="https://twitter.com/fayeofficial_"
        target="_blank"
        rel="noreferrer"
        className={ITEM}
        aria-label="X"
      >
        <SiX className="h-5 w-5" />
      </a>
      <div className="flex h-11 w-11 items-center justify-center">
        <StatusAvatar size={28} />
      </div>
      <Link
        to="/doom"
        className={ITEM}
        activeProps={ACTIVE_PROPS}
        aria-label="Doom"
      >
        <Gamepad2Icon className="h-5 w-5" />
      </Link>
      <Link
        to="/light"
        className={ITEM}
        activeProps={ACTIVE_PROPS}
        aria-label="Light"
      >
        <LightbulbIcon className="h-5 w-5" />
      </Link>
    </nav>
  )
}
