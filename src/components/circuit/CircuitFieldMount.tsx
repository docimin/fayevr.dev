import * as React from 'react'
import { detectTierInputs, resolveTier, type Tier } from '@/lib/perf/tier'
import CircuitFallback from './CircuitFallback'

// Dynamic import keeps three.js out of the initial bundle entirely.
const CircuitField = React.lazy(() => import('./CircuitField'))

export default function CircuitFieldMount() {
  const [tier, setTier] = React.useState<Tier | null>(null)
  const [ready, setReady] = React.useState(false)
  const [degraded, setDegraded] = React.useState(false)

  // Stable identities: these are passed into the lazily-loaded canvas, whose
  // effects depend on them. Inline arrows would change every render and re-fire
  // those effects, which can resurrect `ready` after a degrade.
  const handleReady = React.useCallback(() => setReady(true), [])
  const handleDegrade = React.useCallback(() => {
    setDegraded(true)
    setReady(false)
  }, [])

  React.useEffect(() => {
    if (typeof window.requestIdleCallback !== 'function') {
      const timeout = setTimeout(() => {
        setTier(resolveTier(detectTierInputs()))
      }, 200)
      return () => clearTimeout(timeout)
    }
    const handle = window.requestIdleCallback(() => {
      setTier(resolveTier(detectTierInputs()))
    })
    return () => window.cancelIdleCallback(handle)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <CircuitFallback
        className={`absolute inset-0 transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {!degraded && (tier === 'high' || tier === 'low') && (
        <React.Suspense fallback={null}>
          <CircuitField
            tier={tier}
            onReady={handleReady}
            onDegrade={handleDegrade}
          />
        </React.Suspense>
      )}
    </div>
  )
}
