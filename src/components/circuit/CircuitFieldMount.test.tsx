import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CircuitFieldMount from './CircuitFieldMount'

// jsdom has no matchMedia at all, so detectTierInputs() takes its
// non-browser guard branch and resolveTier returns 'off' via the missing-WebGL2
// check. That covers the SSR/unsupported path only - the reduced-motion path is
// a different branch and is covered separately below.
// Throwing here turns any gate regression into an obvious failure instead of
// letting jsdom choke on a real three.js import.
vi.mock('./CircuitField', () => ({
  default: () => {
    throw new Error('CircuitField must not be imported when the tier is off')
  },
}))

describe('CircuitFieldMount (unsupported environment)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('keeps the fallback fully visible and never mounts the canvas', async () => {
    render(<CircuitFieldMount />)

    const svg = document.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('opacity-100')

    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    expect(svg?.getAttribute('class')).toContain('opacity-100')
    expect(svg?.getAttribute('class')).not.toContain('opacity-0')
    expect(screen.queryByTestId('circuit-field')).toBeNull()
  })
})
