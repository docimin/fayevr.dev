export type StackGroup = {
  id: string
  name: string
  icon: 'layers' | 'code' | 'database' | 'cpu'
  items: string[]
}

export const STACK: StackGroup[] = [
  {
    id: 'frameworks',
    name: 'Frameworks',
    icon: 'layers',
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte'],
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: 'code',
    items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go'],
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: 'database',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: 'cpu',
    items: ['Docker', 'Git', 'VS Code', 'GitHub Actions', 'Vercel'],
  },
]
