import { createContext, useContext, useReducer, useCallback, useMemo, useLayoutEffect, useEffect } from 'react'

// top-level key
const KEY = 'NOAHZINSMEISTER.COM'

enum LocalStorageKey {
  DARK_MODE
}

enum Action {
  INITIALIZE,
  CHANGE_DARK_MODE
}

interface State {
  [LocalStorageKey.DARK_MODE]: boolean
}

function initialize() {
  return { [LocalStorageKey.DARK_MODE]: false }
}

const LocalStorageContext = createContext<[State, any]>([initialize(), {}])

function useLocalStorageContext() {
  return useContext(LocalStorageContext)
}

function reducer(_: State, { type, payload }) {
  switch (type) {
    case Action.INITIALIZE: {
      const { isDarkMode } = payload
      return { [LocalStorageKey.DARK_MODE]: isDarkMode }
    }
    case Action.CHANGE_DARK_MODE: {
      const { isDarkMode } = payload
      return { [LocalStorageKey.DARK_MODE]: isDarkMode }
    }
    default: {
      throw Error(`Unexpected action type '${type}' in LocalStorageContext reducer.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialize)

  const changeDarkMode = useCallback(isDarkMode => {
    dispatch({ type: Action.CHANGE_DARK_MODE, payload: { isDarkMode } })
  }, [])

  useLayoutEffect(() => {
    let existingState
    try {
      existingState = JSON.parse(window.localStorage.getItem(KEY)) ?? {}
    } finally {
      window?.localStorage.clear()
    }
    const isDarkMode =
      typeof existingState[LocalStorageKey.DARK_MODE] === 'boolean'
        ? existingState[LocalStorageKey.DARK_MODE]
        : window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? true
        : false
    dispatch({ type: Action.INITIALIZE, payload: { isDarkMode } })
  }, [])

  useEffect(() => {
    window?.matchMedia('(prefers-color-scheme: dark)').addListener(event => {
      if (event.matches) changeDarkMode(true)
    })
    window?.matchMedia('(prefers-color-scheme: light)').addListener(event => {
      if (event.matches) changeDarkMode(false)
    })
  }, [changeDarkMode])

  return (
    <LocalStorageContext.Provider value={useMemo(() => [state, { changeDarkMode }], [state, changeDarkMode])}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function Updater() {
  const [state] = useLocalStorageContext()

  useEffect(() => {
    window?.localStorage.setItem(KEY, JSON.stringify(state))
  })

  return null
}

export function useDarkModeManager(): [boolean, () => void] {
  const [state, { changeDarkMode }] = useLocalStorageContext()

  const isDarkMode = state[LocalStorageKey.DARK_MODE]

  const toggleDarkMode = useCallback(() => {
    changeDarkMode(!isDarkMode)
  }, [changeDarkMode, isDarkMode])

  return [isDarkMode, toggleDarkMode]
}
