import React from 'react'
import styled from 'styled-components'

import { useDarkModeManager } from '../context'
import Emoji from './Emoji'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`

const DarkThemeEmoji = styled(Emoji)`
  margin: 1rem;
  cursor: pointer;
`

export default function Layout({ children }) {
  const [isDarkMode, toggleDarkMode] = useDarkModeManager()

  return (
    <Root>
      <>
        <Header>
          <DarkThemeEmoji onClick={toggleDarkMode} label={isDarkMode ? 'moon' : 'sun'}>
            {isDarkMode ? '🌘' : '🌔'}
          </DarkThemeEmoji>
        </Header>
        {children}
      </>
    </Root>
  )
}
