import { Code2, Cpu, Database, Layers } from 'lucide-react'
import React from 'react'

type TechItem = {
  id: string
  name: string
  votes: number
}

export type Category = {
  id: string
  name: string
  icon: React.ReactNode
  items: TechItem[]
}

export const initialCategories: Category[] = [
  {
    id: 'frameworks',
    name: 'Frameworks',
    icon: <Layers className="h-5 w-5" />,
    items: [
      {
        id: 'react',
        name: 'React',
        votes: -12,
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        votes: 38,
      },
      {
        id: 'vue',
        name: 'Vue.js',
        votes: 27,
      },
      {
        id: 'angular',
        name: 'Angular',
        votes: 18,
      },
      {
        id: 'svelte',
        name: 'Svelte',
        votes: 31,
      },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: <Code2 className="h-5 w-5" />,
    items: [
      {
        id: 'typescript',
        name: 'TypeScript',
        votes: 45,
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        votes: 39,
      },
      {
        id: 'python',
        name: 'Python',
        votes: 36,
      },
      {
        id: 'rust',
        name: 'Rust',
        votes: 29,
      },
      {
        id: 'go',
        name: 'Go',
        votes: 25,
      },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    icon: <Database className="h-5 w-5" />,
    items: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        votes: 33,
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        votes: 28,
      },
      {
        id: 'mysql',
        name: 'MySQL',
        votes: 24,
      },
      {
        id: 'redis',
        name: 'Redis',
        votes: 22,
      },
      {
        id: 'supabase',
        name: 'Supabase',
        votes: 19,
      },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: <Cpu className="h-5 w-5" />,
    items: [
      {
        id: 'docker',
        name: 'Docker',
        votes: 37,
      },
      {
        id: 'git',
        name: 'Git',
        votes: 41,
      },
      {
        id: 'vscode',
        name: 'VS Code',
        votes: 40,
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        votes: 26,
      },
      {
        id: 'vercel',
        name: 'Vercel',
        votes: 32,
      },
    ],
  },
]
