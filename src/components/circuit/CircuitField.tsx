import { PerformanceMonitor } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as React from 'react'
import * as THREE from 'three'
import type { Tier } from '@/lib/perf/tier'
import { buildCircuitGeometry } from './geometry'
import { useFieldProgress } from './useFieldProgress'

type CircuitFieldProps = {
  tier: Tier
  onReady: () => void
  onDegrade: () => void
}

const PULSE_VERTEX = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute vec2 aSeed;
  uniform float uTime;
  uniform float uDensity;
  varying float vAlpha;

  void main() {
    float t = fract(aSeed.x + uTime * aSeed.y * 0.15);
    vec3 traveled = mix(aStart, aEnd, t);
    vAlpha = (1.0 - abs(t * 2.0 - 1.0)) * uDensity;
    vec4 viewPosition = modelViewMatrix * vec4(traveled, 1.0);
    viewPosition.xy += position.xy * 0.09;
    gl_Position = projectionMatrix * viewPosition;
  }
`

const PULSE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    if (vAlpha <= 0.01) discard;
    gl_FragColor = vec4(uColor, vAlpha);
  }
`

// Reads the site's --primary token (HSL triplet, e.g. "24.6 95% 53.1%") so the
// field tracks the theme instead of hardcoding a hex that can drift from it.
function readPrimaryColor(): THREE.Color {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim()
  const [h, s, l] = raw.split(' ').map((part) => Number.parseFloat(part))
  if (!Number.isFinite(h) || !Number.isFinite(s) || !Number.isFinite(l)) {
    throw new Error(`CircuitField: could not parse --primary token "${raw}"`)
  }
  return new THREE.Color().setHSL(h / 360, s / 100, l / 100)
}

function buildPulseGeometry(geometry: ReturnType<typeof buildCircuitGeometry>) {
  const { traces, pulseSeeds, pulseCount } = geometry
  const segmentCount = traces.length / 6
  const count = Math.min(pulseCount, segmentCount)

  const starts = new Float32Array(count * 3)
  const ends = new Float32Array(count * 3)
  for (let index = 0; index < count; index++) {
    const base = index * 6
    starts.set(traces.subarray(base, base + 3), index * 3)
    ends.set(traces.subarray(base + 3, base + 6), index * 3)
  }

  const instanced = new THREE.InstancedBufferGeometry()
  instanced.setIndex([0, 1, 2, 0, 2, 3])
  instanced.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0],
      3
    )
  )
  instanced.instanceCount = count
  instanced.setAttribute(
    'aStart',
    new THREE.InstancedBufferAttribute(starts, 3)
  )
  instanced.setAttribute('aEnd', new THREE.InstancedBufferAttribute(ends, 3))
  instanced.setAttribute(
    'aSeed',
    new THREE.InstancedBufferAttribute(pulseSeeds.subarray(0, count * 2), 2)
  )
  return instanced
}

const Field = React.memo(function Field({ tier }: { tier: Tier }) {
  const progress = useFieldProgress()
  const nodesRef = React.useRef<THREE.InstancedMesh>(null)
  const nodeMaterialRef = React.useRef<THREE.MeshBasicMaterial>(null)
  const lineMaterialRef = React.useRef<THREE.LineBasicMaterial>(null)
  const groupRef = React.useRef<THREE.Group>(null)

  const [initialColor] = React.useState(() => readPrimaryColor())
  const uniforms = React.useRef({
    uTime: { value: 0 },
    uDensity: { value: 1 },
    uColor: { value: initialColor },
  })

  const geometry = React.useMemo(
    () =>
      buildCircuitGeometry({
        seed: 1337,
        layers: tier === 'high' ? 3 : 2,
        nodesPerLayer: tier === 'high' ? 14 : 8,
        width: 26,
        height: 34,
        depth: 14,
      }),
    [tier]
  )

  const pulseGeometry = React.useMemo(
    () => buildPulseGeometry(geometry),
    [geometry]
  )

  // useMemo recomputes are not unmounts, so React never disposes the previous
  // InstancedBufferGeometry - do it ourselves whenever the memo replaces it.
  React.useEffect(() => {
    return () => pulseGeometry.dispose()
  }, [pulseGeometry])

  // The theme toggle flips a class on <html> outside any React tree this
  // component belongs to, so track it directly instead of polling per frame.
  React.useEffect(() => {
    const applyColor = () => {
      const next = readPrimaryColor()
      uniforms.current.uColor.value.copy(next)
      nodeMaterialRef.current?.color.copy(next)
      lineMaterialRef.current?.color.copy(next)
    }
    const observer = new MutationObserver(applyColor)
    observer.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  React.useLayoutEffect(() => {
    const mesh = nodesRef.current
    if (!mesh) return

    const dummy = new THREE.Object3D()
    for (let index = 0; index < geometry.nodeCount; index++) {
      dummy.position.set(
        geometry.nodes[index * 3],
        geometry.nodes[index * 3 + 1],
        geometry.nodes[index * 3 + 2]
      )
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [geometry])

  // Reads refs only. A setState here would re-render the tree every frame.
  useFrame((state, delta) => {
    const { scroll, pointerX, pointerY } = progress.current
    uniforms.current.uTime.value += delta
    uniforms.current.uDensity.value = 1 - scroll * 0.75

    const group = groupRef.current
    if (group) {
      group.rotation.y += (pointerX * 0.12 - group.rotation.y) * 0.05
      group.rotation.x += (pointerY * 0.08 - group.rotation.x) * 0.05
    }

    // camera={{ position: [0, 0, 18] }} on <Canvas> only seeds the camera on
    // creation - R3F does not reapply it on re-render, so animating position
    // here every frame does not fight that prop.
    state.camera.position.z +=
      (18 - scroll * 9 - state.camera.position.z) * 0.06
  })

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, geometry.nodeCount]}
        frustumCulled={false}
      >
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshBasicMaterial
          ref={nodeMaterialRef}
          color={initialColor}
          toneMapped={false}
        />
      </instancedMesh>

      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[geometry.traces, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMaterialRef}
          color={initialColor}
          transparent
          opacity={0.32}
          toneMapped={false}
        />
      </lineSegments>

      <mesh geometry={pulseGeometry} frustumCulled={false}>
        <shaderMaterial
          vertexShader={PULSE_VERTEX}
          fragmentShader={PULSE_FRAGMENT}
          uniforms={uniforms.current}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
})

export default function CircuitField({
  tier,
  onReady,
  onDegrade,
}: CircuitFieldProps) {
  const [dpr, setDpr] = React.useState(tier === 'high' ? 1.75 : 1)
  const [frameloop, setFrameloop] = React.useState<'always' | 'never'>('always')
  const declines = React.useRef(0)

  React.useEffect(() => {
    const onVisibility = () =>
      setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never')

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: 'none' }}
      frameloop={frameloop}
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 18], fov: 55 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      onCreated={(state) => {
        // Preserved from the placeholder: a lost context must degrade
        // permanently, same as the two-strike PerformanceMonitor path below.
        state.gl.domElement.addEventListener(
          'webglcontextlost',
          (event) => {
            event.preventDefault()
            onDegrade()
          },
          { once: true }
        )
        onReady()
      }}
    >
      <PerformanceMonitor
        onDecline={() => {
          declines.current += 1
          // First strike drops resolution; a second means this GPU cannot
          // hold the budget, so fall back to the static SVG for good.
          if (declines.current === 1) setDpr(1)
          else onDegrade()
        }}
      >
        <Field tier={tier} />
      </PerformanceMonitor>
    </Canvas>
  )
}
