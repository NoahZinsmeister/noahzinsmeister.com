import { useRouter } from 'next/router'

import { isIPFS } from '../utils'
import { useKeyDown } from '../hooks'
import { useDarkModeManager } from '../contexts/LocalStorage'
import Emoji from './Emoji'
import Link from './Link'
import IPFSLogo from '../svg/IPFSLogo'

export default function Layout({ children }) {
  const { route } = useRouter()
  const isPhotography = route === '/photography'

  const [isDarkMode, toggleDarkMode] = useDarkModeManager()
  useKeyDown('d', toggleDarkMode)

  return (
    <div className="root">
      <div className="header">
        <h1 className="title" style={{ lineHeight: 1 }}>
          {isPhotography ? (
            <>
              <Link href="/" style={{ color: 'unset' }}>
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
          emoji={isDarkMode ? '🌘' : '🌔'}
          label={isDarkMode ? 'moon' : 'sun'}
          onClick={toggleDarkMode}
          style={{ height: 'fit-content' }}
        />
      </div>

      <div className="body">{children}</div>

      <div className="footer">
        {isIPFS && (
          <Link style={{ lineHeight: 0 }} href="https://ipfs.io" title="Served over IPFS">
            <IPFSLogo height="24px" />
          </Link>
        )}

        <code>
          commit{' '}
          <Link href={`https://github.com/NoahZinsmeister/noahzinsmeister.com/tree/${process.env.COMMIT_SHA}`}>
            {process.env.COMMIT_SHA.slice(0, 7)}
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
          justify-content: ${isIPFS ? 'space-between' : 'flex-end'};
          align-items: flex-end;
          padding: 2rem;
        }

        .ipfs {
          user-select: none;
          height: 24px;
        }
      `}</style>
    </div>
  )
}
