import { describe, expect, it } from 'vitest'
import { filterPalette, PALETTE_ITEMS } from '@/lib/palette'

describe('filterPalette', () => {
  it('returns nothing for an empty query', () => {
    expect(filterPalette(PALETTE_ITEMS, '')).toEqual([])
  })

  it('matches on name, case insensitively', () => {
    const result = filterPalette(PALETTE_ITEMS, 'PROJ')
    expect(result.some((item) => item.url === '/projects')).toBe(true)
  })

  it('restricts to projects when the query starts with #', () => {
    const result = filterPalette(PALETTE_ITEMS, '#')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((item) => item.category === 'Projects')).toBe(true)
  })

  it('filters within the # namespace by the rest of the query', () => {
    const result = filterPalette(PALETTE_ITEMS, '#fayevr')
    expect(result.every((item) => item.category === 'Projects')).toBe(true)
    expect(result.some((item) => item.name.includes('fayevr'))).toBe(true)
  })
})
