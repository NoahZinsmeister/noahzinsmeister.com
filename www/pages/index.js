import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { rgba } from 'polished'

const Root = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${rgba('gold', 0.4)};
`

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

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;
`

const CopyEmoji = styled.span`
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  cursor: pointer;
`

export default function Main() {
  const [copied, setCopied] = useState(false)

  function onCopy() {
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
    <Root>
      <Body>
        <H3>
          <span role="img" aria-label="wave">
            👋🏻
          </span>{' '}
          I'm Noah!
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
            {copied ? (
              <CopyEmoji>
                <span role="img" aria-label="copied">
                  👍🏻
                </span>
              </CopyEmoji>
            ) : (
              <CopyToClipboard text={'noahwz@gmail.com'} onCopy={onCopy}>
                <CopyEmoji>
                  <span role="img" aria-label="copy">
                    📋
                  </span>
                </CopyEmoji>
              </CopyToClipboard>
            )}
          </LinkWrapper>
        </Links>
      </Body>
    </Root>
  )
}
