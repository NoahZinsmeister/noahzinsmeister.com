import React from 'react'
import styled from 'styled-components'
import { useDarkModeManager } from '../context'
import { darken } from 'polished'

const A = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;
  color: ${({ theme }) => theme.linkBlue};

  :hover {
    cursor: pointer;
  }

  :active {
    color: ${({ theme, isDarkMode }) => darken(isDarkMode ? 0.25 : 0.5, theme.linkBlue)};
  }

  :visited {
    color: ${({ theme }) => darken(0.25, theme.linkBlue)};
  }

  :active:visited {
    color: ${({ theme }) => darken(0.75, theme.linkBlue)};
  }
`

export default function Link({ children, ...rest }) {
  const [isDarkMode] = useDarkModeManager()

  return (
    <A isDarkMode={isDarkMode} {...rest}>
      {children}
    </A>
  )
}
