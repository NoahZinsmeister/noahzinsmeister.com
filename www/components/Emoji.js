import React from 'react'
import styled from 'styled-components'

const Span = styled.span.attrs(({ label }) => ({
  role: 'img',
  ariaLabel: label || 'emoji'
}))`
  user-select: none;

  :active:focus {
    outline: none;
  }
`

export default function Emoji({ children, onClick, ...rest }) {
  const clickable = !!onClick

  function onEnterPressed(event) {
    if (event.key === 'Enter') {
      onClick(event)
    }
  }

  return (
    <Span {...(clickable ? { onClick, onKeyPress: onEnterPressed, tabIndex: '0' } : {})} {...rest}>
      {children}
    </Span>
  )
}
