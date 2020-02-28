import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { useKeyDown } from '../hooks'
import { useDarkModeManager } from '../contexts/LocalStorage'
import Emoji from './Emoji'
import Link from './Link'

const IPFS = process.env.IPFS === 'true'

const commit = process.env.NOW_GITHUB_COMMIT_SHA || process.env.GITHUB_SHA || 'master'

export default function Layout({ children }) {
  const [isDarkMode, toggleDarkMode] = useDarkModeManager()
  const { route } = useRouter()
  const isPhotography = route === '/photography'

  const toggleDarkModeWithVibrate = useCallback(() => {
    toggleDarkMode()
    try {
      window.navigator.vibrate(125)
    } catch {}
  }, [toggleDarkMode])

  useKeyDown('d', toggleDarkModeWithVibrate)

  return (
    <div className="root">
      <div className="header">
        <h1 className="title" style={{ lineHeight: 1 }}>
          {isPhotography ? (
            <>
              <Link href="/" asNextLink style={{ color: 'unset' }}>
                Noah
                <br />
                Zinsmeister
              </Link>
              <br />
              Photography
            </>
          ) : (
            <>
              Noah
              <br />
              Zinsmeister
            </>
          )}
        </h1>
        <Emoji
          style={{ height: 'fit-content' }}
          emoji={isDarkMode ? '🌘' : '🌔'}
          label={isDarkMode ? 'moon' : 'sun'}
          onClick={toggleDarkModeWithVibrate}
        />
      </div>

      <div className="body">{children}</div>

      <div className="footer">
        {IPFS && (
          <Link style={{ lineHeight: 0 }} href="https://ipfs.io" title="Served over IPFS">
            <img className="ipfs" src={`./ipfs-${isDarkMode ? 'light' : 'dark'}.png`} alt="Served over IPFS" />
          </Link>
        )}

        <code>
          commit{' '}
          <Link href={`https://github.com/NoahZinsmeister/noahzinsmeister.com/tree/${commit}`}>
            {commit.slice(0, 7)}{' '}
          </Link>
        </code>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          width: 100vw;
          min-height: 100vh;
          overflow: hidden;
        }

        .header {
          display: flex;
          flex: 0 1 auto;
          justify-content: space-between;
          padding: 2rem;
        }

        .body {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          padding: 0 2rem 0rem 2rem;
        }

        .footer {
          display: flex;
          flex: 0 1 auto;
          justify-content: ${IPFS ? 'space-between' : 'flex-end'};
          align-items: flex-end;
          padding: 2rem;
        }

        .ipfs {
          height: 24px;
        }
      `}</style>
    </div>
  )
}
