import CrtPanel from '@/components/CrtPanel'

export default function BraceError({ onFix }: { onFix: () => void }) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="syntax-error-title"
      className="fixed inset-0 z-50 flex items-center bg-black/80 p-4"
    >
      <CrtPanel>
        <p
          id="syntax-error-title"
          className="doom-flicker font-display text-3xl font-bold text-primary"
        >
          SYNTAX ERROR
        </p>

        <p className="mt-4 font-display text-lg text-white">
          <span className="doom-type">UNEXPECTED END OF INPUT</span>
        </p>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          about( ) was never closed. somebody walked off with the last brace,
          and I think it was you.
        </p>

        <p className="mt-4 font-mono text-xs text-gray-400">
          {'index.tsx // expected "}" // found nothing'}
        </p>

        <button
          type="button"
          // biome-ignore lint/a11y/noAutofocus: the dialog traps the page, focus has to land on its only control
          autoFocus
          onClick={onFix}
          className="relative mt-6 rounded-sm border-2 border-white px-3.5 py-2.5 text-white hover:border-primary hover:text-primary"
        >
          put it back &#125;
        </button>
      </CrtPanel>
    </div>
  )
}
