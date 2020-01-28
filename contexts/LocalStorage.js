import { createContext, useContext, useReducer, useMemo, useCallback, useEffect, useLayoutEffect } from 'react'

// top-level key
const KEY = 'NOAHZINSMEISTER.COM'

// name(s) of key(s) within top-level key
const DARK_MODE = 'DARK_MODE'

// action types
const INITIALIZE = 'INITIALIZE'
const CHANGE_DARK_MODE = 'CHANGE_DARK_MODE'

const LocalStorageContext = createContext([{}, {}])

function useLocalStorageContext() {
  return useContext(LocalStorageContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case INITIALIZE: {
      return {
        ...state,
        ...payload.state
      }
    }
    case CHANGE_DARK_MODE: {
      const { isDarkMode } = payload
      return {
        ...state,
        [DARK_MODE]: isDarkMode
      }
    }
    default: {
      throw Error(`Unexpected action type '${type}' in LocalStorageContext reducer.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, { [DARK_MODE]: false })

  const changeDarkMode = useCallback(isDarkMode => {
    dispatch({ type: CHANGE_DARK_MODE, payload: { isDarkMode } })
  }, [])

  useLayoutEffect(() => {
    try {
      dispatch({ type: INITIALIZE, payload: { state: JSON.parse(window.localStorage.getItem(KEY)) } })
    } catch {}
  }, [])

  return (
    <LocalStorageContext.Provider value={useMemo(() => [state, { changeDarkMode }], [state, changeDarkMode])}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function Updater() {
  const [state] = useLocalStorageContext()

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  })

  return null
}

export function useDarkModeManager() {
  const [state, { changeDarkMode }] = useLocalStorageContext()

  const isDarkMode = state[DARK_MODE]

  const toggleDarkMode = useCallback(() => {
    changeDarkMode(!isDarkMode)
  }, [changeDarkMode, isDarkMode])

  return [isDarkMode, toggleDarkMode]
}
