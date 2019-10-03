import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import copy from 'copy-to-clipboard'

import Emoji from '../components/Emoji'
import Link from '../components/Link'
import { useBodyKeyDown } from '../hooks'

const SHORT = 'SHORT'
const LONG = 'LONG'

function Bio() {
  const router = useRouter()
  const selected = router.query.description === 'long' ? LONG : SHORT

  function setShortBio() {
    router.push('/', undefined, { shallow: true })
  }

  function setLongBio() {
    router.push({ pathname: '/', query: { description: 'long' } }, undefined, { shallow: true })
  }

  useBodyKeyDown('ArrowRight', setLongBio, selected === LONG)
  useBodyKeyDown('ArrowLeft', setShortBio, selected === SHORT)

  return (
    <>
      <div className="wrapper">
        <div className="length-selectors">
          <div className="length-selector">
            <Emoji
              style={selected === SHORT ? { textDecoration: 'underline', textUnderlinePosition: 'under' } : {}}
              emoji="⬇️"
              label="short"
              onClick={setShortBio}
            />
          </div>
          <div className="length-selector">
            <Emoji
              style={selected === LONG ? { textDecoration: 'underline', textUnderlinePosition: 'under' } : {}}
              emoji="⬇️⬇️"
              label="long"
              onClick={setLongBio}
            />
          </div>
        </div>
        {selected === SHORT ? (
          <p>
            I graduated from Columbia in 2016, where I studied economics and math. After a close call with an econ PhD I
            became fascinated with cryptocurrencies, and have since gone fully down the rabbit hole. Right now I'm a
            Senior Engineer at <Link href="https://uniswap.io/">Uniswap</Link>, a decentralized exchange built on
            Ethereum.
          </p>
        ) : (
          <p>
            I have a B.A. in Economics-Mathematics from Columbia University. After graduating I spent nearly two years
            at the Federal Reserve Bank of New York working as a Senior Research Analyst in the Money and Payments
            Studies division. My long-standing interest in cryptocurrencies eventually led me to an engineering role at
            Hydrogen, where I wrote security grade smart contracts, co-authored{' '}
            <Link href="https://github.com/ethereum/EIPs/issues/1495">ERC-1484</Link> (a digital identity protocol), and
            developed open-source blockchain tooling. I'm now a Senior Engineer at{' '}
            <Link href="https://uniswap.io/">Uniswap</Link>, a decentralized exchange protocol for trading
            Ethereum-based assets. I also take <Link href="https://noahzinsmeisterphotography.com/">photos</Link>{' '}
            sometimes.
          </p>
        )}
      </div>

      <style jsx>{`
        .wrapper {
          margin-top: 4rem;
          max-width: 50rem;
          margin-bottom: 5vh;
        }

        .length-selectors {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-bottom: 1rem;

          margin-top: -1rem;
          margin-right: -2rem;
        }

        .length-selectors .length-selector {
          margin-top: 1rem;
          margin-right: 2em;
        }

        .selected {
          margin: 20rem;
        }

        p {
          word-wrap: break-word;
          margin: 0 2rem 0 2rem;
          text-align: justify;
        }
      `}</style>
    </>
  )
}

export default function Main() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    copy('noahwz@gmail.com')
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 500)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copied])

  useBodyKeyDown('c', copyEmail, copied === true)

  return (
    <>
      <div>
        <h2 className="title">
          <Emoji emoji="👋🏻" label="wave" /> I'm Noah!
        </h2>
      </div>

      <div className="links">
        <div className="link-wrapper">
          <Link href="https://github.com/NoahZinsmeister">GitHub</Link>
        </div>

        <div className="link-wrapper">
          <Link href="https://twitter.com/NoahZinsmeister">Twitter</Link>
        </div>

        <div className="link-wrapper">
          <Link href="mailto:noahwz@gmail.com">Email</Link>
          <Emoji
            style={{ marginLeft: '.5rem' }}
            emoji={copied ? '👍🏻' : '📋'}
            label={copied ? 'copied' : 'copy'}
            onClick={!copied && copyEmail}
          />
        </div>
      </div>

      <Bio />

      <style jsx>{`
        .title {
          margin-top: 5vh;
          margin-bottom: 2rem;
        }

        .links {
          display: flex;
          margin-top: -1rem;
          margin-right: -1rem;
        }

        .links .link-wrapper {
          display: flex;
          margin-top: 1rem;
          margin-right: 1rem;
        }
      `}</style>
    </>
  )
}
