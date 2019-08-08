import React from 'react'
import styled from 'styled-components'

import { useDarkModeManager } from '../context'
import SVGIcon, { GITHUB } from '../svg'
import Emoji from './Emoji'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  flex: 0 1 auto;
  justify-content: flex-end;
`

const DarkThemeEmoji = styled(Emoji)`
  margin: 1rem;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 0 1 auto;
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
      <Header>
        <DarkThemeEmoji label={isDarkMode ? 'moon' : 'sun'} onClick={toggleDarkMode}>
          {isDarkMode ? '🌘' : '🌔'}
        </DarkThemeEmoji>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <GitHub name={GITHUB} width="24px" fill={isDarkMode ? '#FFFFFF' : '#000000'} onClick={openGitHub} />
      </Footer>
    </Root>
  )
}
