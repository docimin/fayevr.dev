import type { ReactNode } from 'react'

export default function CrtPanel({ children }: { children: ReactNode }) {
  return (
    <div className="doom-crt relative mx-auto w-full max-w-md overflow-hidden rounded-lg border-2 border-black bg-black p-6 text-center dark:border-white">
      <div className="doom-scanlines pointer-events-none absolute inset-0" />
      {children}
    </div>
  )
}
