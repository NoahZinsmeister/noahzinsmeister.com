import React from 'react'
import styled from 'styled-components'

import { useDarkModeManager } from '../context'
import SVGIcon, { GITHUB } from '../svg'
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
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
`

const GitHub = styled(SVGIcon)`
  margin: 1rem;
`

export default function Layout({ children }) {
  const [isDarkMode, toggleDarkMode] = useDarkModeManager()

  function openGitHub() {
    window.open('https://github.com/NoahZinsmeister/noahzinsmeister.com', '_blank')
  }

  return (
    <Root>
      <>
        <Header>
          <DarkThemeEmoji label={isDarkMode ? 'moon' : 'sun'} onClick={toggleDarkMode}>
            {isDarkMode ? '🌘' : '🌔'}
          </DarkThemeEmoji>
        </Header>
        {children}
        <Footer>
          <GitHub name={GITHUB} width="1.5rem" fill={isDarkMode ? '#FFFFFF' : '#000000'} onClick={openGitHub} />
        </Footer>
      </>
    </Root>
  )
}
