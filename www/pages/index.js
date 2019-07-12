import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
`

const Link = styled.a.attrs(({ email }) =>
  email
    ? {}
    : {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
)`
  text-decoration: none;
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  margin-top: -1rem;
  margin-right: -1rem;
  ${Link} {
    margin-top: 1rem;
    margin-right: 1rem;
  }
`

export default function Main() {
  return (
    <Root>
      <h4>
        <span role="img" aria-label="wave">
          👋🏻
        </span>{' '}
        I'm Noah!
      </h4>
      <Links>
        <Link href="https://github.com/NoahZinsmeister">GitHub</Link>
        <Link href="https://twitter.com/NoahZinsmeister">Twitter</Link>
        <Link email href="mailto:noahwz@gmail.com">
          Email
        </Link>
      </Links>
    </Root>
  )
}
