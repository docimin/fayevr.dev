import * as React from 'react'
import CommandPalette from './CommandPalette'

type CommandPaletteContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const CommandPaletteContext =
  React.createContext<CommandPaletteContextValue | null>(null)

// Single shared instance: both SideLeft and MobileNav trigger this same
// dialog instead of each mounting their own (cmdk's Dialog portals to
// document.body, so a hidden ancestor would not stop a second instance
// from rendering on top of the first).
export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const value = React.useMemo(() => ({ open, setOpen }), [open])

  return (
    <CommandPaletteContext value={value}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </CommandPaletteContext>
  )
}

export function useCommandPalette() {
  const ctx = React.use(CommandPaletteContext)
  if (!ctx) {
    throw new Error(
      'useCommandPalette must be used inside CommandPaletteProvider'
    )
  }
  return ctx
}
