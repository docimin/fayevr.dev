import * as React from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.dataset.revealed = 'true'
        observer.disconnect()
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
