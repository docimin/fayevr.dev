import { render, screen, waitFor } from '@testing-library/react'
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

vi.mock('./CircuitField', () => ({
  default: ({ onReady }: { onReady: () => void }) => {
    React.useEffect(() => {
      onReady()
    }, [onReady])
    return <div data-testid="circuit-field" />
  },
}))

describe('CircuitFieldMount (high tier)', () => {
  it('mounts the canvas and fades the fallback out once it reports ready', async () => {
    render(<CircuitFieldMount />)

    const svg = document.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('opacity-100')

    expect(await screen.findByTestId('circuit-field')).toBeInTheDocument()
    await waitFor(() =>
      expect(svg?.getAttribute('class')).toContain('opacity-0')
    )
  })
})
