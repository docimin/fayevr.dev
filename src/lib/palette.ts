import { PROJECTS } from '@/data/projects'

export type PaletteItem = {
  id: string
  name: string
  category: 'Pages' | 'Projects' | 'Help'
  url: string
  external?: boolean
}

const PAGES: PaletteItem[] = [
  { id: 'home', name: 'home', category: 'Pages', url: '/' },
  { id: 'projects', name: 'projects', category: 'Pages', url: '/projects' },
  { id: 'doom', name: 'doom', category: 'Pages', url: '/doom' },
  { id: 'light', name: 'light', category: 'Pages', url: '/light' },
  {
    id: 'github',
    name: 'github',
    category: 'Help',
    url: 'https://github.com/docimin/',
    external: true,
  },
]

export const PALETTE_ITEMS: PaletteItem[] = [
  ...PAGES,
  ...PROJECTS.map((project) => ({
    id: `project-${project.name}`,
    name: project.name,
    category: 'Projects' as const,
    url: project.customUrl ?? project.gitRepo ?? '/projects',
    external: Boolean(project.customUrl ?? project.gitRepo),
  })),
]

export function filterPalette(
  items: PaletteItem[],
  query: string
): PaletteItem[] {
  if (query === '') return []

  if (query.startsWith('#')) {
    const term = query.slice(1).toLowerCase()
    return items.filter(
      (item) =>
        item.category === 'Projects' && item.name.toLowerCase().includes(term)
    )
  }

  const term = query.toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(term))
}
