import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

const A = styled.a`
  text-decoration: none;
  color: ${({ color, theme }) => color || theme.linkBlue};
  transition: color 200ms ease-out;

  :hover {
    cursor: pointer;
  }

  :active {
    color: ${({ color, theme }) => darken(0.25, color || theme.linkBlue)};
  }
`

export default function Link({ color, children, ...rest }) {
  return (
    <A target="_blank" rel="noopener noreferrer" color={color} {...rest}>
      {children}
    </A>
  )
}
