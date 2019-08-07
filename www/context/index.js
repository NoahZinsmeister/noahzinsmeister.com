import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'
import { formatCookie } from '../utils'

// name of cookie key
export const COOKIE_NAME = 'NOAHZINSMEISTER'

// name of key(s) within top-level cookie key
export const DARK_MODE = 'DARK_MODE'
const KEYS = [DARK_MODE]

// action types
const UPDATE_KEY = 'UPDATE_KEY'

const CookieContext = createContext()

function useCookieContext() {
  return useContext(CookieContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_KEY: {
      const { key, value } = payload

      if (!KEYS.some(k => k === key)) {
        throw Error(`Unexpected key in CookieContext reducer: '${key}'.`)
      }

      return {
        ...state,
        [key]: value
      }
    }
    default: {
      throw Error(`Unexpected action type in CookieContext reducer: '${type}'.`)
    }
  }
}

function init({ darkModeInitial }) {
  return { [DARK_MODE]: darkModeInitial === null ? false : darkModeInitial }
}

export default function Provider({ darkModeInitial, children }) {
  const [state, dispatch] = useReducer(reducer, { darkModeInitial }, init)

  const updateKey = useCallback((key, value) => {
    dispatch({ type: UPDATE_KEY, payload: { key, value } })
  }, [])

  return (
    <CookieContext.Provider value={useMemo(() => [state, { updateKey }], [state, updateKey])}>
      {children}
    </CookieContext.Provider>
  )
}

export function Updater() {
  const [state] = useCookieContext()

  useEffect(() => {
    Cookies.set(COOKIE_NAME, formatCookie(state))
  })

  return null
}

export function useDarkModeManager() {
  const [state, { updateKey }] = useCookieContext()

  const isDarkMode = state[DARK_MODE]

  const toggleDarkMode = useCallback(() => {
    updateKey(DARK_MODE, !isDarkMode)
  }, [updateKey, isDarkMode])

  return [isDarkMode, toggleDarkMode]
}
