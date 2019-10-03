import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'

import { formatCookie } from '../utils'

// name of cookie key
export const COOKIE_NAME = 'NOAHZINSMEISTER'

// name of key(s) within top-level cookie key
export const DARK_MODE = 'DARK_MODE'

// action types
const CHANGE_DARK_MODE = 'CHANGE_DARK_MODE'

const CookieContext = createContext([{}, {}])

function useCookieContext() {
  return useContext(CookieContext)
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
      throw Error(`Unexpected action type in CookieContext reducer: '${type}'.`)
    }
  }
}

function init({ darkModeInitial }) {
  return { [DARK_MODE]: darkModeInitial }
}

export default function Provider({ darkModeInitial, children }) {
  const [state, dispatch] = useReducer(reducer, { darkModeInitial }, init)

  const changeDarkMode = useCallback(isDarkMode => {
    dispatch({ type: CHANGE_DARK_MODE, payload: { isDarkMode } })
  }, [])

  return (
    <CookieContext.Provider value={useMemo(() => [state, { changeDarkMode }], [state, changeDarkMode])}>
      {children}
    </CookieContext.Provider>
  )
}

export function Updater() {
  const [state] = useCookieContext()

  useEffect(() => {
    Cookies.set(COOKIE_NAME, formatCookie(state), {
      expires: 365,
      secure: process.env.ENVIRONMENT === 'development' ? false : true
    })
  })

  return null
}

export function useDarkModeManager() {
  const [state, { changeDarkMode }] = useCookieContext()

  const isDarkMode = state[DARK_MODE]

  const toggleDarkMode = useCallback(() => {
    changeDarkMode(!isDarkMode)
  }, [changeDarkMode, isDarkMode])

  return [isDarkMode, toggleDarkMode]
}
