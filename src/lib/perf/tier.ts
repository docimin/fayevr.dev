export type Tier = 'high' | 'low' | 'off'

export type TierInputs = {
  webgl2: boolean
  reducedMotion: boolean
  saveData: boolean
  hardwareConcurrency: number
  deviceMemory?: number
  coarsePointer: boolean
}

export function resolveTier(inputs: TierInputs): Tier {
  if (!inputs.webgl2 || inputs.reducedMotion || inputs.saveData) return 'off'
  if (inputs.hardwareConcurrency <= 4) return 'low'
  if (inputs.deviceMemory !== undefined && inputs.deviceMemory <= 4)
    return 'low'
  if (inputs.coarsePointer) return 'low'
  return 'high'
}

function detectWebgl2(): boolean {
  if (typeof document === 'undefined') return false
  const canvas = document.createElement('canvas')
  try {
    const gl = canvas.getContext('webgl2')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch (e) {
    console.warn(
      'detectTierInputs: webgl2 probe failed, treating as unsupported',
      e
    )
    return false
  }
}

export function detectTierInputs(): TierInputs {
  if (typeof navigator === 'undefined' || typeof matchMedia === 'undefined') {
    console.warn(
      'detectTierInputs: called outside the browser, falling back to inputs that resolve to the "off" tier'
    )
    return {
      webgl2: false,
      reducedMotion: false,
      saveData: false,
      hardwareConcurrency: 4,
      deviceMemory: undefined,
      coarsePointer: false,
    }
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }

  return {
    webgl2: detectWebgl2(),
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: Boolean(nav.connection?.saveData),
    hardwareConcurrency: nav.hardwareConcurrency ?? 4,
    deviceMemory: nav.deviceMemory,
    coarsePointer: matchMedia('(pointer: coarse)').matches,
  }
}
