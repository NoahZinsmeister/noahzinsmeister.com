import { useBodyKeyDown } from '../hooks'
import useTheme from '../theme'
import { useDarkModeManager } from '../contexts/LocalStorage'
import SVGIcon, { GITHUB } from './SVGIcon'
import Emoji from './Emoji'
import Link from './Link'

export default function Layout({ children }) {
  const [isDarkMode, toggleDarkMode] = useDarkModeManager()
  const theme = useTheme()

  useBodyKeyDown('d', toggleDarkMode)

  return (
    <div className="root">
      <div className="header">
        <h1 className="title" style={{ lineHeight: 1 }}>
          Noah
          <br />
          Zinsmeister
        </h1>
        <Emoji emoji={isDarkMode ? '🌘' : '🌔'} label={isDarkMode ? 'moon' : 'sun'} onClick={toggleDarkMode} />
      </div>

      <div className="body">{children}</div>

      <div className="footer">
        <Link style={{ lineHeight: 0 }} href="https://github.com/NoahZinsmeister/noahzinsmeister.com">
          <SVGIcon name={GITHUB} width="24px" fill={theme.colors.text} />
        </Link>
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
          justify-content: flex-end;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}
