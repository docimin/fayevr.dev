import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import CircuitFieldMount from './CircuitFieldMount'

// The load-bearing promise of the whole 3D layer: a visitor who asked for
// reduced motion must never download or run the WebGL chunk. This mocks a
// fully capable browser that merely prefers reduced motion, so it exercises
// resolveTier's reduced-motion branch rather than the missing-WebGL2 one.
vi.mock('@/lib/perf/tier', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/perf/tier')>()
  return {
    ...actual,
    detectTierInputs: () => ({
      webgl2: true,
      reducedMotion: true,
      saveData: false,
      hardwareConcurrency: 16,
      deviceMemory: 32,
      coarsePointer: false,
    }),
  }
})

vi.mock('./CircuitField', () => ({
  default: () => {
    throw new Error('CircuitField must not mount under prefers-reduced-motion')
  },
}))

describe('CircuitFieldMount (prefers-reduced-motion)', () => {
  it('never mounts the canvas on an otherwise capable device', async () => {
    vi.useFakeTimers()
    try {
      render(<CircuitFieldMount />)

      await act(async () => {
        vi.advanceTimersByTime(1000)
      })

      const svg = document.querySelector('svg')
      expect(svg?.getAttribute('class')).toContain('opacity-100')
      expect(screen.queryByTestId('circuit-field')).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })
})
