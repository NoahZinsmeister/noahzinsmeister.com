import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'

import Emoji from '../components/Emoji'
import Link from '../components/Link'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`

const H3 = styled.h3`
  margin-top: 0;
`

const LinkWrapper = styled.div``

const Links = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  margin-top: -1rem;
  margin-right: -1rem;
  ${LinkWrapper} {
    margin-top: 1rem;
    margin-right: 1rem;
  }
`

const CopyEmoji = styled(Emoji)`
  margin: 0.5rem;
  cursor: pointer;
`

export default function Main() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    copy('noahwz@gmail.com')
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const reset = setTimeout(() => {
        setCopied(false)
      }, 500)

      return () => {
        clearTimeout(reset)
      }
    }
  }, [copied])

  return (
    <Body>
      <H3>
        <Emoji label="wave">👋🏻</Emoji> I'm Noah!
      </H3>
      <Links>
        <LinkWrapper>
          <Link href="https://github.com/NoahZinsmeister">GitHub</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="https://twitter.com/NoahZinsmeister">Twitter</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="mailto:noahwz@gmail.com">Email</Link>{' '}
          <CopyEmoji label={copied ? 'copied' : 'copy'} onClick={copied ? false : copyEmail}>
            {copied ? '👍🏻' : '📋'}
          </CopyEmoji>
        </LinkWrapper>
      </Links>
    </Body>
  )
}
