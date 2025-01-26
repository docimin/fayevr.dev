import Link from 'next/link'

export default function Header() {
  const buttonClass =
    'px-3.5 py-2.5 border-2 rounded-sm shadow-button transition-shadow duration-200'
  const commonStyles =
    'border-black dark:border-white dark:text-white text-black shadow-black dark:shadow-white'

  return (
    <div className="pt-4 dark:text-white text-black flex gap-3.5">
      <Link href={'/'}>
        <button type="button" className={`${buttonClass} ${commonStyles}`}>
          home
        </button>
      </Link>
      <Link href={'/about'}>
        <button type="button" className={`${buttonClass} ${commonStyles}`}>
          about
        </button>
      </Link>
      <Link href={'/projects'}>
        <button type="button" className={`${buttonClass} ${commonStyles}`}>
          projects
        </button>
      </Link>
    </div>
  )
}
