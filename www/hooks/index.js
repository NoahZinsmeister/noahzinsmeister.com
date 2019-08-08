import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

// modified from https://codesandbox.io/embed/lp80n9z7v9
export function useMeasure() {
  const ref = useRef()
  const [observedInitial, setObservedInitial] = useState(false)

  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))

  useEffect(() => {
    ref.current && ro.observe(ref.current)

    return () => {
      ro.disconnect()
    }
  }, [ro])

  useEffect(() => {
    if (!observedInitial) {
      if (bounds.height !== 0) {
        setObservedInitial(true)
      }
    }
  }, [observedInitial, bounds.height])

  return [{ ref }, bounds, observedInitial]
}
