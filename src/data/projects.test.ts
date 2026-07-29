import { describe, expect, it } from 'vitest'
import { PROJECTS, type Project, STATUS_ORDER, sortProjects } from './projects'

const make = (name: string, status: Project['status']): Project => ({
  name,
  status,
  private: false,
  createdAt: '2024-01-01',
})

describe('sortProjects', () => {
  it('orders by declared status rank before name', () => {
    const sorted = sortProjects([
      make('b', 'Archived'),
      make('a', 'Ongoing'),
      make('c', 'Completed'),
    ])
    expect(sorted.map((p) => p.name)).toEqual(['a', 'c', 'b'])
  })

  it('falls back to name within one status', () => {
    const sorted = sortProjects([
      make('zeta', 'Ongoing'),
      make('alpha', 'Ongoing'),
    ])
    expect(sorted.map((p) => p.name)).toEqual(['alpha', 'zeta'])
  })

  it('does not mutate its input', () => {
    const input = [make('b', 'Archived'), make('a', 'Ongoing')]
    sortProjects(input)
    expect(input.map((p) => p.name)).toEqual(['b', 'a'])
  })

  it('every seeded project uses a known status', () => {
    for (const project of PROJECTS) {
      expect(STATUS_ORDER).toContain(project.status)
    }
  })
})
