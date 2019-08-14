import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import { useDarkModeManager } from '../contexts/Cookie'
import { useStringFlasher } from '../contexts/Application'
import { useBodyKeyDown } from '../hooks'
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
  justify-content: space-between;
  flex: 0 1 auto;
`

const KeyFlash = styled(animated.p)`
  display: flex;
  align-items: flex-end;
  margin: 1rem;
  user-select: none;
`

const GitHub = styled(SVGIcon)`
  margin: 1rem;
`

export default function Layout({ children }) {
  const [isDarkMode, toggleDarkMode] = useDarkModeManager()

  const [stringToFlash, stringToFlashKey] = useStringFlasher()
  const [props, set] = useSpring(() => ({
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 200 * 2 }
  }))

  useEffect(() => {
    if (stringToFlash) {
      set({
        from: { opacity: 1 },
        reset: true
      })
    }
  }, [stringToFlash, stringToFlashKey, set])

  function openGitHub() {
    window.open('https://github.com/NoahZinsmeister/noahzinsmeister.com', '_blank')
  }

  useBodyKeyDown('d', toggleDarkMode)

  return (
    <Root>
      <Header>
        <DarkThemeEmoji label={isDarkMode ? 'moon' : 'sun'} onClick={toggleDarkMode}>
          {isDarkMode ? '🌘' : '🌔'}
        </DarkThemeEmoji>
      </Header>
      <Body>{children}</Body>
      <Footer>
        <KeyFlash style={props}>{stringToFlash}</KeyFlash>
        <GitHub name={GITHUB} width="24px" fill={isDarkMode ? '#FFFFFF' : '#000000'} onClick={openGitHub} />
      </Footer>
    </Root>
  )
}
