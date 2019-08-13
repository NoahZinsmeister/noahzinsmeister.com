import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react'

export const STRING_TO_FLASH = 'STRING_TO_FLASH'
export const STRING_TO_FLASH_KEY = 'STRING_TO_FLASH_KEY'

// action types
const UPDATE_STRING_TO_FLASH = 'UPDATE_STRING_TO_FLASH'

const ApplicationContext = createContext()

function useApplicationContext() {
  return useContext(ApplicationContext)
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_STRING_TO_FLASH: {
      const { value } = payload

      return {
        ...state,
        [STRING_TO_FLASH]: value,
        [STRING_TO_FLASH_KEY]: state[STRING_TO_FLASH_KEY] + 1
      }
    }
    default: {
      throw Error(`Unexpected action type in ApplicationContext reducer: '${type}'.`)
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, { [STRING_TO_FLASH]: '', [STRING_TO_FLASH_KEY]: 0 })

  const updateStringToFlash = useCallback(value => {
    dispatch({ type: UPDATE_STRING_TO_FLASH, payload: { value } })
  }, [])

  return (
    <ApplicationContext.Provider value={useMemo(() => [state, { updateStringToFlash }], [state, updateStringToFlash])}>
      {children}
    </ApplicationContext.Provider>
  )
}

export function useStringFlasher() {
  const [state, { updateStringToFlash }] = useApplicationContext()

  const stringToFlash = state[STRING_TO_FLASH]
  const stringToFlashKey = state[STRING_TO_FLASH_KEY]

  const setStringToFlash = useCallback(
    newKey => {
      updateStringToFlash(newKey)
    },
    [updateStringToFlash]
  )

  return [stringToFlash, stringToFlashKey, setStringToFlash]
}
