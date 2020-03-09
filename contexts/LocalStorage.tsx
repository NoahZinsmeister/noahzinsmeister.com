import { createContext, useContext, useReducer, useCallback, useMemo, useLayoutEffect, useEffect } from 'react'

const KEY = 'NOAHZINSMEISTER.COM'

enum Item {
  DARK_MODE
}

interface State {
  [Item.DARK_MODE]: boolean
}

function initialize(): State {
  const prefersDarkMode = window?.matchMedia('(prefers-color-scheme: dark)').matches ? true : false

  let inDarkMode = prefersDarkMode
  try {
    const existingState = JSON.parse(window.localStorage.getItem(KEY))
    inDarkMode = existingState[Item.DARK_MODE]
  } catch {}

  return { [Item.DARK_MODE]: inDarkMode }
}

enum Action {
  INITIALIZE,
  CHANGE_DARK_MODE
}

function reducer(_: State, { type, payload }) {
  switch (type) {
    case Action.INITIALIZE: {
      const { isDarkMode } = payload
      return { [Item.DARK_MODE]: isDarkMode }
    }
    case Action.CHANGE_DARK_MODE: {
      const { isDarkMode } = payload
      return { [Item.DARK_MODE]: isDarkMode }
    }
    default: {
      throw Error(`Unexpected action type '${type}' in LocalStorageContext reducer.`)
    }
  }
}

const LocalStorageContext = createContext<[State, any]>([{ [Item.DARK_MODE]: false }, {}])

function useLocalStorageContext() {
  return useContext(LocalStorageContext)
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialize)

  const changeDarkMode = useCallback(isDarkMode => {
    dispatch({ type: Action.CHANGE_DARK_MODE, payload: { isDarkMode } })
  }, [])

  return (
    <LocalStorageContext.Provider value={useMemo(() => [state, { changeDarkMode }], [state, changeDarkMode])}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function Updater() {
  const [state, { changeDarkMode }] = useLocalStorageContext()

  // sync state to local storage
  useEffect(() => {
    window?.localStorage.setItem(KEY, JSON.stringify(state))
  })

  // sync state to preferred color scheme changes
  useEffect(() => {
    window?.matchMedia('(prefers-color-scheme: dark)').addListener(event => {
      if (event.matches) changeDarkMode(true)
    })
    window?.matchMedia('(prefers-color-scheme: light)').addListener(event => {
      if (event.matches) changeDarkMode(false)
    })
  }, [changeDarkMode])

  return null
}

export function useDarkModeManager(): [boolean, () => void] {
  const [state, { changeDarkMode }] = useLocalStorageContext()

  const inDarkMode = state[Item.DARK_MODE]

  const toggleDarkMode = useCallback(() => {
    changeDarkMode(!inDarkMode)
    window?.navigator?.vibrate(125)
  }, [inDarkMode, changeDarkMode])

  return [inDarkMode, toggleDarkMode]
}
