import { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'

function encode(o) {
  const stringified = JSON.stringify(o || {})
  return Buffer.from(stringified).toString('base64')
}

function decode(s) {
  const stringified = Buffer.from(s || JSON.stringify({}), 'base64').toString()
  return JSON.parse(stringified)
}

// top-level key
const KEY = 'NOAHZINSMEISTER.COM'

// name(s) of key(s) within top-level key
const DARK_MODE = 'DARK_MODE'

// action types
const CHANGE_DARK_MODE = 'CHANGE_DARK_MODE'

const LocalStorageContext = createContext([{}, {}])

function useLocalStorageContext() {
  return useContext(LocalStorageContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
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

function init() {
  const fallback = { [DARK_MODE]: false }

  try {
    return { ...fallback, ...decode(window.localStorage.getItem(KEY)) }
  } catch {
    return fallback
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  const changeDarkMode = useCallback(isDarkMode => {
    dispatch({ type: CHANGE_DARK_MODE, payload: { isDarkMode } })
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
    window.localStorage.setItem(KEY, encode(state))
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
