import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import copy from 'copy-to-clipboard'

import Emoji from '../components/Emoji'
import Link from '../components/Link'
import { useBodyKeyDown } from '../hooks'

const VIEWS = {
  0: {
    emoji: '⬇️',
    label: 'short-description',
    view: undefined
  },
  1: {
    emoji: '⏬',
    label: 'long-description',
    view: 'long-description'
  },
  2: {
    emoji: '📺',
    label: 'videos',
    view: 'videos'
  },
  3: {
    emoji: '📝',
    label: 'articles',
    view: 'articles'
  }
}

function Bio() {
  const router = useRouter()

  const validView = Object.keys(VIEWS)
    .map(k => VIEWS[k].view)
    .includes(router.query.view)
  useEffect(() => {
    if (!validView) {
      router.push({ pathname: '/', query: {} }, undefined, { shallow: true })
    }
  })

  const viewKey = validView ? Number(Object.keys(VIEWS).filter(k => VIEWS[k].view === router.query.view)[0]) : 0

  function setView(index) {
    router.push({ pathname: '/', query: VIEWS[index].view ? { view: VIEWS[index].view } : {} }, undefined, {
      shallow: true
    })
  }

  function next() {
    setView((viewKey + 1) % Object.keys(VIEWS).length)
  }

  function previous() {
    setView(viewKey - 1 < 0 ? Object.keys(VIEWS).length - 1 : viewKey - 1)
  }

  useBodyKeyDown('ArrowRight', next, viewKey === Object.keys(VIEWS).length - 1)
  useBodyKeyDown('ArrowLeft', previous, viewKey === 0)

  return (
    <>
      <div className="wrapper">
        <div className="view-selectors">
          {Object.keys(VIEWS).map((k, i) => (
            <div key={k} className="view-selector">
              <Emoji
                style={viewKey === i ? { textDecoration: 'underline', textUnderlinePosition: 'under' } : {}}
                emoji={VIEWS[k].emoji}
                label={VIEWS[k].label}
                onClick={() => setView(i)}
              />
            </div>
          ))}
        </div>
        {viewKey === 0 ? (
          <p>
            I graduated from Columbia in 2016, where I studied economics and math. After a close call with an econ PhD I
            became fascinated with cryptocurrencies and have since gone fully down the rabbit hole. At the moment, I
            live in Williamsburg and work as a Senior Engineer at <Link href="https://uniswap.io/">Uniswap</Link>, a
            decentralized digital asset exchange.
          </p>
        ) : viewKey === 1 ? (
          <p>
            I have a B.A. in Economics-Mathematics from Columbia University. After graduating I spent nearly two years
            at the Federal Reserve Bank of New York working as a Senior Research Analyst in the Money and Payments
            Studies division. My long-standing interest in cryptocurrencies eventually led me to an engineering role at
            Hydrogen, where I wrote security grade smart contracts, co-authored{' '}
            <Link href="https://github.com/ethereum/EIPs/issues/1495">ERC-1484</Link> (a digital identity protocol), and
            developed open-source blockchain tooling. I'm now a Senior Engineer at{' '}
            <Link href="https://uniswap.io/">Uniswap</Link>.
            <br />
            <br />I also created and maintain{' '}
            <Link href="https://github.com/NoahZinsmeister/web3-react">web3-react</Link> (a framework for building
            dApps), and occasionally <Link href="https://noahzinsmeisterphotography.com/">take photos</Link>.
          </p>
        ) : viewKey === 2 ? (
          <p>
            <li>
              <Link href="https://www.youtube.com/watch?v=9ih_J223Hrg">
                Building Modern dApps in React with web3-react
              </Link>{' '}
              (<i>Talk</i>, 6/25/2019)
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=wSUwFVp4Fn4&t=25589">DeFi's Real vs Expected Users</Link> (
              <i>Panel</i>, 10/7/2019)
            </li>
          </p>
        ) : (
          <p>
            <li>
              <Link href="https://libertystreeteconomics.newyorkfed.org/2017/08/regulatory-incentives-and-quarter-end-dynamics-in-the-repo-market.html">
                Regulatory Incentives and Quarter-End Dynamics in the Repo Market
              </Link>{' '}
              (<i>Liberty Street Economics</i>, 8/7/2017)
            </li>
            <li>
              <Link href="https://libertystreeteconomics.newyorkfed.org/2017/10/excess-funding-capacity-in-tri-party-repo.html">
                Excess Funding Capacity in Tri-Party Repo
              </Link>{' '}
              (<i>Liberty Street Economics</i>, 10/2/2017)
            </li>
            <li>
              <Link href="https://libertystreeteconomics.newyorkfed.org/2017/10/the-cost-and-duration-of-excess-funding-capacity-in-tri-party-repo.html">
                The Cost and Duration of Excess Funding Capacity in Tri-Party Repo
              </Link>{' '}
              (<i>Liberty Street Economics</i>, 10/4/2017)
            </li>
          </p>
        )}
      </div>

      <style jsx>{`
        .wrapper {
          margin-top: 4rem;
          max-width: 50rem;
          margin-bottom: 5vh;
        }

        .view-selectors {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-bottom: 1rem;

          margin-top: -1rem;
          margin-right: -2rem;
        }

        .view-selectors .view-selector {
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
        <h1 className="title">
          <Emoji emoji="👋🏻" label="wave" style={{ fontSize: 'inherit' }} /> I'm Noah!
        </h1>
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
