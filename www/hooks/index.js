import { useCallback, useEffect } from 'react'

export function useBodyKeyDown(targetKey, onKeyDown, suppress = false) {
  const downHandler = useCallback(
    event => {
      if (event.target.tagName === 'BODY' && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        if (event.key === targetKey && !suppress) {
          event.preventDefault()
          onKeyDown(event)
        }
      }
    },
    [targetKey, onKeyDown, suppress]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [downHandler])
}
