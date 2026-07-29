import { act, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import CircuitFieldMount from './CircuitFieldMount'

vi.mock('@/lib/perf/tier', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/perf/tier')>()
  return {
    ...actual,
    detectTierInputs: () => ({
      webgl2: true,
      reducedMotion: false,
      saveData: false,
      hardwareConcurrency: 8,
      deviceMemory: 8,
      coarsePointer: false,
    }),
  }
})

let mountCount = 0
let triggerDegrade: (() => void) | null = null

// onDegrade is exposed rather than called during the mount effect: calling both
// onReady and onDegrade in one effect lets React batch the two commits, so the
// canvas can vanish before any query observes it and the test races.
vi.mock('./CircuitField', () => ({
  default: ({
    onReady,
    onDegrade,
  }: {
    onReady: () => void
    onDegrade: () => void
  }) => {
    triggerDegrade = onDegrade
    React.useEffect(() => {
      mountCount += 1
      onReady()
    }, [onReady])
    return <div data-testid="circuit-field" />
  },
}))

describe('CircuitFieldMount (degrade)', () => {
  it('unmounts the canvas for good and restores the fallback', async () => {
    render(<CircuitFieldMount />)

    expect(await screen.findByTestId('circuit-field')).toBeInTheDocument()

    // Degrading must be one-way: a remount loop would thrash the GPU on
    // exactly the weak devices this path exists to protect.
    await act(async () => {
      triggerDegrade?.()
    })

    expect(screen.queryByTestId('circuit-field')).toBeNull()

    const svg = document.querySelector('svg')
    await waitFor(() => {
      expect(svg?.getAttribute('class')).toContain('opacity-100')
    })

    expect(mountCount).toBe(1)
  })
})
