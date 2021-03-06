import { useState, useEffect } from 'react'
import Head from 'next/head'
import { resolve } from 'styled-jsx/css'
import copy from 'copy-to-clipboard'

import { useKeyDown } from '../hooks'
import Emoji from '../components/Emoji'
import Link from '../components/Link'

function getUniswapLinkStyles() {
  return resolve`
    a:hover {
      color: #dc6be5 !important;
    }
  `
}

export default function Index() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    copy('noahwz@pm.me')
    setCopied(true)
    try {
      window.navigator.vibrate(125)
    } catch {}
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

  useKeyDown('c', copyEmail, copied === true)

  return (
    <>
      <Head>
        <title>Noah Zinsmeister</title>
        <meta key="description" name="Description" content="Noah Zinsmeister" />
      </Head>
      <div className="links">
        <div className="link-wrapper">
          <Link href="https://github.com/NoahZinsmeister">GitHub</Link>
        </div>
        <div className="link-wrapper">
          <Link href="https://twitter.com/NoahZinsmeister">Twitter</Link>
        </div>
        <div className="link-wrapper">
          <Link href="mailto:noahwz@pm.me">Email</Link>
          <Emoji
            style={{ marginLeft: '.5rem' }}
            size={'1.25rem'}
            emoji={copied ? '👍' : '📋'}
            label={copied ? 'copied' : 'copy'}
            onClick={!copied && copyEmail}
          />
        </div>
      </div>

      <Content />

      <style jsx>{`
        .links {
          display: flex;
          margin-top: -2rem;
          margin-right: -0.75rem;
          margin-bottom: 4rem;
        }

        .link-wrapper {
          display: flex;
          margin-top: 1rem;
          margin-right: 0.75rem;
        }
      `}</style>
    </>
  )
}

function Content() {
  const [E, setE] = useState('E')
  const { className, styles } = getUniswapLinkStyles()

  return (
    <>
      <div className="section">
        <Emoji emoji={'🎙'} label={'biography'} />
        <p className="text">
          I graduated from <span className="columbia">Columbia</span> with a B.A. in Economics-Mathematics in 2016.
          After a close call with a PhD I fell far, far down the cryptocurrency rabbit hole. I'm currently Engineering
          Lead at{' '}
          <Link className={className} href="https://uniswap.io">
            Uniswap
          </Link>
          {styles}, a decentralized digital asset exchange built on{' '}
          <span
            onMouseEnter={() => {
              setE('Ξ')
            }}
            onMouseLeave={() => {
              setE('E')
            }}
          >
            {E}thereum
          </span>
          , and I also maintain <Link href="https://github.com/NoahZinsmeister/web3-react">web3-react</Link>, a
          framework I created for building blockchain applications. In my spare time I like to ski, play games, and{' '}
          <Link href="/photography">take photos</Link>!
        </p>
      </div>
      <div className="section">
        <Emoji emoji={'✒️'} label={'articles'} />
        <ul className="list">
          <li>
            <Link href="https://uniswap.org/whitepaper.pdf">Uniswap v2 Core</Link>
            <br />
            <code>2020-03-01</code>
          </li>
          <li>
            <Link href="https://libertystreeteconomics.newyorkfed.org/2017/10/the-cost-and-duration-of-excess-funding-capacity-in-tri-party-repo.html">
              The Cost and Duration of Excess Funding Capacity in Tri-Party Repo
            </Link>
            <br />
            <code>2017-10-04</code>
          </li>
          <li>
            <Link href="https://libertystreeteconomics.newyorkfed.org/2017/10/excess-funding-capacity-in-tri-party-repo.html">
              Excess Funding Capacity in Tri-Party Repo
            </Link>
            <br />
            <code>2017-10-02</code>
          </li>
          <li>
            <Link href="https://libertystreeteconomics.newyorkfed.org/2017/08/regulatory-incentives-and-quarter-end-dynamics-in-the-repo-market.html">
              Regulatory Incentives and Quarter-End Dynamics in the Repo Market
            </Link>
            <br />
            <code>2017-08-07</code>
          </li>
        </ul>
      </div>
      <div className="section">
        <Emoji emoji={'🎬'} label={'videos'} />
        <ul className="list">
          <li>
            <Link href="https://www.youtube.com/watch?v=gRBCD5nzBdQ&t=18269">
              DeFi: Composability, Adoption & What's Next
            </Link>
            <br />
            <code>2020-02-15</code>
          </li>

          <li>
            <Link href="https://www.youtube.com/watch?v=wSUwFVp4Fn4&t=25589">DeFi's Real vs Expected Users</Link>
            <br />
            <code>2019-10-07</code>
          </li>
          <li>
            <Link href="https://www.youtube.com/watch?v=9ih_J223Hrg">
              Building Modern dApps in React with web3-react
            </Link>
            <br />
            <code>2019-06-25</code>
          </li>
        </ul>
      </div>
      <div className="section">
        <Emoji emoji={'📷'} label={'photography'} />
        <ul className="list">
          <li>
            <Link href="/photography">Noah Zinsmeister Photography</Link>
          </li>
          <li>
            <Link href="https://fingerlakesfeast.com/">Finger Lakes Feast</Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .section {
          display: flex;
          flex-direction: row;
          max-width: 45rem;
          margin-bottom: 2rem;
        }

        .text {
          word-wrap: break-word;
          margin: 0 2rem 0 2rem;
          text-align: justify;
          list-style-position: inside;
        }

        .columbia:hover {
          color: #b9d9eb;
        }

        .uniswap {
          color: #dc6be5;
        }

        .list {
          margin: 0 2rem 0 2rem;
          list-style-type: none;
        }
        .list li :not(:last-child) {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  )
}
