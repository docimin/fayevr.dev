import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { CommandPaletteProvider } from '../components/CommandPaletteProvider'
import ContextMenuProvider from '../components/ContextMenuProvider'
import MobileNav from '../components/nav/MobileNav'
import { ThemeProvider } from '../components/theme/ThemeProvider'
import { THEME_SCRIPT } from '../components/theme/theme-script'
import '../../css/globals.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Faye | Portfolio' },
      {
        name: 'description',
        content:
          "Faye's personal portfolio website. A place to showcase my projects and skills.",
      },
    ],
    scripts: [{ children: THEME_SCRIPT }],
    links: [
      {
        rel: 'preload',
        href: '/fonts/PixelMplus12-Regular.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/JetBrainsMono-variable.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      {/* text-foreground is the baseline: without it everything inherits the UA
          default black, which is invisible in dark mode. */}
      <body className="flex min-h-full bg-white text-foreground antialiased dark:bg-black tracking-widest">
        <ThemeProvider>
          <ContextMenuProvider>
            <CommandPaletteProvider>
              <div className="relative z-10 w-full pb-20 md:pb-0">
                {children}
              </div>
              <MobileNav />
            </CommandPaletteProvider>
          </ContextMenuProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
