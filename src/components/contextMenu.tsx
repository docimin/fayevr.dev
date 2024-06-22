'use client'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { SiGithub } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import * as React from 'react'
import Link from 'next/link'

export default function ContextMenuProvider({ children }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <Link
          href={'https://github.com/docimin/fayevr.dev'}
          passHref
          target={'_blank'}
        >
          <ContextMenuItem inset>
            GitHub
            <ContextMenuShortcut>
              <SiGithub size={16} />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </Link>
        <ContextMenuSeparator />
        <Link href={'/'} passHref>
          <ContextMenuItem inset>Home</ContextMenuItem>
        </Link>
        <Link href={'/about'} passHref>
          <ContextMenuItem inset>About</ContextMenuItem>
        </Link>
        <Link href={'/projects'} passHref>
          <ContextMenuItem inset>Projects</ContextMenuItem>
        </Link>
      </ContextMenuContent>
    </ContextMenu>
  )
}
