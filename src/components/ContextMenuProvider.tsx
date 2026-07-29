import { SiGithub } from '@icons-pack/react-simple-icons'
import { Link } from '@tanstack/react-router'
import type * as React from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

export default function ContextMenuProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <a
          href={'https://github.com/docimin/fayevr.dev'}
          target={'_blank'}
          rel="noreferrer"
        >
          <ContextMenuItem inset>
            GitHub
            <ContextMenuShortcut>
              <SiGithub size={16} />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </a>
        <ContextMenuSeparator />
        <Link to={'/'}>
          <ContextMenuItem inset>Home</ContextMenuItem>
        </Link>
        <Link to={'/projects'}>
          <ContextMenuItem inset>Projects</ContextMenuItem>
        </Link>
      </ContextMenuContent>
    </ContextMenu>
  )
}
