import { useEffect, useRef, useState } from 'react'

/**
 * useFadeIn – Scroll-triggered fade-in using IntersectionObserver.
 *
 * @param {number} threshold - 0–1, percentage of element visible before triggering.
 * @returns {[React.RefObject, boolean]} [ref to attach, isVisible]
 *
 * Usage:
 *   const [ref, visible] = useFadeIn()
 *   <div ref={ref} style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
 */
export function useFadeIn(threshold = 0.15) {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)   // fire only once
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
