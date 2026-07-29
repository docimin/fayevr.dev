import * as React from 'react'

export type FieldProgress = {
  scroll: number
  pointerX: number
  pointerY: number
}

// Scroll and pointer are written to a ref by passive listeners and read
// inside useFrame - a setState here would re-render the tree every frame.
export function useFieldProgress() {
  const progress = React.useRef<FieldProgress>({
    scroll: 0,
    pointerX: 0,
    pointerY: 0,
  })

  React.useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current.scroll = max > 0 ? window.scrollY / max : 0
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    const onPointer = (event: PointerEvent) => {
      progress.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1
      progress.current.pointerY = (event.clientY / window.innerHeight) * 2 - 1
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return progress
}
