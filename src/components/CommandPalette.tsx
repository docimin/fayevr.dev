import { useRouter } from '@tanstack/react-router'
import { Command } from 'cmdk'
import * as React from 'react'
import { filterPalette, PALETTE_ITEMS, type PaletteItem } from '@/lib/palette'

export default function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  const results = filterPalette(PALETTE_ITEMS, query)
  const groups = Array.from(new Set(results.map((item) => item.category)))

  const select = (item: PaletteItem) => {
    onOpenChange(false)
    setQuery('')
    if (item.external) window.location.href = item.url
    else router.navigate({ to: item.url })
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Site search"
      shouldFilter={false}
      overlayClassName="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-20"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-glass text-foreground shadow-elevation-3 backdrop-blur">
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Search..."
          className="h-12 w-full border-0 bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-hidden"
        />
        <Command.List className="max-h-80 overflow-y-auto pb-2">
          {query !== '' && (
            <Command.Empty className="px-6 py-10 text-center text-sm text-muted-foreground">
              No results found
            </Command.Empty>
          )}
          {groups.map((group) => (
            <Command.Group
              key={group}
              heading={group}
              className="px-2 py-1.5 text-xs font-semibold text-muted-foreground"
            >
              {results
                .filter((item) => item.category === group)
                .map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.id}
                    onSelect={() => select(item)}
                    className="cursor-pointer rounded-sm px-2 py-2 text-sm font-normal text-foreground data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                  >
                    {item.name}
                  </Command.Item>
                ))}
            </Command.Group>
          ))}
        </Command.List>
        <div className="flex items-center gap-1 border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          Type
          <kbd className="mx-1 flex h-5 w-5 items-center justify-center rounded-sm border border-primary text-primary">
            #
          </kbd>
          to search projects.
        </div>
      </div>
    </Command.Dialog>
  )
}
