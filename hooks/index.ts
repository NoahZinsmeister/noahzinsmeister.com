import { useCallback, useEffect } from 'react'

export function useKeyDown(targetKey: string, onKeyDown: (...args: any) => void, suppress = false, bodyOnly = true) {
  const downHandler = useCallback(
    event => {
      if (
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.key === targetKey &&
        !suppress &&
        (event.target.tagName === 'BODY' || !bodyOnly)
      ) {
        event.preventDefault()
        onKeyDown(event)
      }
    },
    [targetKey, onKeyDown, suppress, bodyOnly]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [downHandler])
}
