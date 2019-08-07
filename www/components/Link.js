import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const A = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.linkBlue};
  transition: color 200ms ease-out;

  :hover {
    cursor: pointer;
  }

  :active {
    color: ${({ theme }) => darken(0.75, theme.linkBlue)};
  }

  :visited {
    color: ${({ theme }) => darken(0.25, theme.linkBlue)};
  }

  :active:visited {
    color: ${({ theme }) => darken(0.75, theme.linkBlue)};
  }
`

export default function Link({ children, ...rest }) {
  return (
    <A target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </A>
  )
}
