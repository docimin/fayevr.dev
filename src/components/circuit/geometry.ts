export type CircuitOptions = {
  seed: number
  layers: number
  nodesPerLayer: number
  width: number
  height: number
  depth: number
}

export type CircuitGeometry = {
  nodes: Float32Array
  traces: Float32Array
  pulseSeeds: Float32Array
  nodeCount: number
  pulseCount: number
}

// mulberry32 - deterministic so the field is stable across renders and testable.
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildCircuitGeometry(options: CircuitOptions): CircuitGeometry {
  const { seed, layers, nodesPerLayer, width, height, depth } = options
  const random = rng(seed)
  const nodeCount = layers * nodesPerLayer

  const nodes = new Float32Array(nodeCount * 3)
  const segments: number[] = []

  for (let layer = 0; layer < layers; layer++) {
    const z = -(layer / Math.max(layers - 1, 1)) * depth
    let previousX = (random() - 0.5) * width
    let previousY = -height / 2

    for (let index = 0; index < nodesPerLayer; index++) {
      const x = (random() - 0.5) * width
      const y = -height / 2 + (index / (nodesPerLayer - 1 || 1)) * height
      const offset = (layer * nodesPerLayer + index) * 3

      nodes[offset] = x
      nodes[offset + 1] = y
      nodes[offset + 2] = z

      // Orthogonal routing: vertical run then horizontal run, matching the
      // existing SVG rail motif rather than a straight diagonal.
      segments.push(previousX, previousY, z, previousX, y, z)
      segments.push(previousX, y, z, x, y, z)

      previousX = x
      previousY = y
    }
  }

  const pulseCount = nodeCount
  const pulseSeeds = new Float32Array(pulseCount * 2)
  for (let index = 0; index < pulseCount; index++) {
    pulseSeeds[index * 2] = random()
    pulseSeeds[index * 2 + 1] = 0.4 + random() * 1.6
  }

  return {
    nodes,
    traces: new Float32Array(segments),
    pulseSeeds,
    nodeCount,
    pulseCount,
  }
}
