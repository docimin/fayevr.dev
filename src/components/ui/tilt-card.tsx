import * as React from 'react'
import { cn } from '@/lib/utils'

const MAX_TILT = 8

export function TiltCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const frame = React.useRef(0)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    if (
      matchMedia('(pointer: coarse)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const onMove = (event: PointerEvent) => {
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const rect = element.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        element.style.transform = `perspective(700px) rotateY(${
          x * MAX_TILT
        }deg) rotateX(${-y * MAX_TILT}deg)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(frame.current)
      frame.current = 0
      element.style.transform = ''
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame.current)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-transform duration-200 will-change-transform',
        className
      )}
    >
      {children}
    </div>
  )
}
