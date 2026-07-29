import { describe, expect, it } from 'vitest'
import { resolveTier, type TierInputs } from './tier'

const base: TierInputs = {
  webgl2: true,
  reducedMotion: false,
  saveData: false,
  hardwareConcurrency: 8,
  deviceMemory: 8,
  coarsePointer: false,
}

describe('resolveTier', () => {
  it('is high on a capable desktop', () => {
    expect(resolveTier(base)).toBe('high')
  })

  it('is off without WebGL2', () => {
    expect(resolveTier({ ...base, webgl2: false })).toBe('off')
  })

  it('is off under reduced motion', () => {
    expect(resolveTier({ ...base, reducedMotion: true })).toBe('off')
  })

  it('is off under save-data', () => {
    expect(resolveTier({ ...base, saveData: true })).toBe('off')
  })

  it('is low on few cores', () => {
    expect(resolveTier({ ...base, hardwareConcurrency: 4 })).toBe('low')
  })

  it('is low on little memory', () => {
    expect(resolveTier({ ...base, deviceMemory: 4 })).toBe('low')
  })

  it('is low on touch devices', () => {
    expect(resolveTier({ ...base, coarsePointer: true })).toBe('low')
  })

  it('treats unknown memory as acceptable', () => {
    expect(resolveTier({ ...base, deviceMemory: undefined })).toBe('high')
  })

  it('prefers off over low when both apply', () => {
    expect(
      resolveTier({ ...base, reducedMotion: true, hardwareConcurrency: 2 })
    ).toBe('off')
  })
})
