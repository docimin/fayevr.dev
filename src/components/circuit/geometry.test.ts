import { describe, expect, it } from 'vitest'
import { buildCircuitGeometry, type CircuitOptions } from './geometry'

const options: CircuitOptions = {
  seed: 42,
  layers: 3,
  nodesPerLayer: 12,
  width: 20,
  height: 30,
  depth: 12,
}

describe('buildCircuitGeometry', () => {
  it('emits three floats per node', () => {
    const geometry = buildCircuitGeometry(options)
    expect(geometry.nodeCount).toBe(36)
    expect(geometry.nodes.length).toBe(36 * 3)
  })

  it('emits trace vertices in segment pairs', () => {
    const { traces } = buildCircuitGeometry(options)
    expect(traces.length % 6).toBe(0)
    expect(traces.length).toBeGreaterThan(0)
  })

  it('is deterministic for a given seed', () => {
    const a = buildCircuitGeometry(options)
    const b = buildCircuitGeometry(options)
    expect(Array.from(a.nodes)).toEqual(Array.from(b.nodes))
    expect(Array.from(a.traces)).toEqual(Array.from(b.traces))
  })

  it('differs across seeds', () => {
    const a = buildCircuitGeometry(options)
    const b = buildCircuitGeometry({ ...options, seed: 43 })
    expect(Array.from(a.nodes)).not.toEqual(Array.from(b.nodes))
  })

  it('keeps every node inside the requested bounds', () => {
    const { nodes } = buildCircuitGeometry(options)
    for (let i = 0; i < nodes.length; i += 3) {
      expect(Math.abs(nodes[i])).toBeLessThanOrEqual(options.width / 2)
      expect(Math.abs(nodes[i + 1])).toBeLessThanOrEqual(options.height / 2)
      expect(Math.abs(nodes[i + 2])).toBeLessThanOrEqual(options.depth)
    }
  })

  it('emits one seed pair per pulse', () => {
    const { pulseSeeds, pulseCount } = buildCircuitGeometry(options)
    expect(pulseSeeds.length).toBe(pulseCount * 2)
  })

  it('scales node count with the layer count', () => {
    const small = buildCircuitGeometry({ ...options, layers: 1 })
    expect(small.nodeCount).toBe(12)
  })

  it('produces only finite values for degenerate layer/node counts', () => {
    const configs: CircuitOptions[] = [
      { ...options, layers: 1 },
      { ...options, nodesPerLayer: 1 },
      { ...options, layers: 1, nodesPerLayer: 1 },
    ]
    for (const config of configs) {
      const { nodes, traces, pulseSeeds } = buildCircuitGeometry(config)
      expect(Array.from(nodes).every(Number.isFinite)).toBe(true)
      expect(Array.from(traces).every(Number.isFinite)).toBe(true)
      expect(Array.from(pulseSeeds).every(Number.isFinite)).toBe(true)
    }
  })
})
